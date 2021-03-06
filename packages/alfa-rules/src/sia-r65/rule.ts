import { Rule, Diagnostic } from "@siteimprove/alfa-act";
import { Keyword } from "@siteimprove/alfa-css";
import { Device } from "@siteimprove/alfa-device";
import { Element } from "@siteimprove/alfa-dom";
import { Predicate } from "@siteimprove/alfa-predicate";
import { Err, Ok } from "@siteimprove/alfa-result";
import { Context } from "@siteimprove/alfa-selector";
import { Style } from "@siteimprove/alfa-style";
import { Criterion } from "@siteimprove/alfa-wcag";
import { Page } from "@siteimprove/alfa-web";

import { expectation } from "../common/expectation";

import {
  hasBoxShadow,
  hasOutline,
  hasTextDecoration,
  isTabbable,
} from "../common/predicate";

import { Question } from "../common/question";

const { isElement } = Element;
const { isKeyword } = Keyword;
const { or, xor } = Predicate;

export default Rule.Atomic.of<Page, Element, Question>({
  uri: "https://siteimprove.github.io/sanshikan/rules/sia-r65.html",
  requirements: [Criterion.of("2.4.7")],
  evaluate({ device, document }) {
    return {
      applicability() {
        const tabbables = document.tabOrder().filter(isTabbable(device));

        // Peak the first two tabbable elements to avoid forcing the whole
        // sequence. If the size of the resulting sequence is less than 2 then
        // fewer than 2 tabbable elements exist.
        if (tabbables.take(2).size < 2) {
          return [];
        }

        return tabbables;
      },

      expectations(target) {
        return {
          1: expectation(
            hasFocusIndicator(device)(target),
            () => Outcomes.HasFocusIndicator,
            () =>
              Question.of(
                "has-focus-indicator",
                "boolean",
                target,
                `Does the element have a visible focus indicator?`
              ).map((hasFocusIndicator) =>
                expectation(
                  hasFocusIndicator,
                  () => Outcomes.HasFocusIndicator,
                  () => Outcomes.HasNoFocusIndicator
                )
              )
          ),
        };
      },
    };
  },
});

export namespace Outcomes {
  export const HasFocusIndicator = Ok.of(
    Diagnostic.of(`The element has a visible focus indicator`)
  );

  export const HasNoFocusIndicator = Err.of(
    Diagnostic.of(`The element does not have a visible focus indicator`)
  );
}

function hasFocusIndicator(device: Device): Predicate<Element> {
  return (element) => {
    const withFocus = Context.focus(element);

    return element
      .inclusiveDescendants({
        flattened: true,
      })
      .concat(
        element.ancestors({
          flattened: true,
        })
      )
      .filter(isElement)
      .some(
        or(
          // For these properties, we assume that the difference is to set it or remove it, not to make small changes on it.
          xor(hasOutline(device), hasOutline(device, withFocus)),
          xor(hasTextDecoration(device), hasTextDecoration(device, withFocus)),
          xor(hasBoxShadow(device), hasBoxShadow(device, withFocus)),
          // These properties are essentially always set, so any difference in the color is good enough.
          hasDifferentColors(device, withFocus),
          hasDifferentBackgroundColors(device, withFocus)
        )
      );
  };
}

function hasDifferentColors(
  device: Device,
  context1: Context = Context.empty(),
  context2: Context = Context.empty()
): Predicate<Element> {
  return function hasDifferentColors(element: Element): boolean {
    const color1 = Style.from(element, device, context1).computed("color");
    const color2 = Style.from(element, device, context2).computed("color");

    // keywords can get tricky and may ultimately yield the same used value,
    // to keep on the safe side, we let the user decide if one color is a keyword.
    if (isKeyword(color1) || isKeyword(color2)) {
      return false;
    }

    return !color1.equals(color2);
  };
}

function hasDifferentBackgroundColors(
  device: Device,
  context1: Context = Context.empty(),
  context2: Context = Context.empty()
): Predicate<Element> {
  return function hasDifferentBackgroundColors(element: Element): boolean {
    const color1 = Style.from(element, device, context1).computed(
      "background-color"
    );
    const color2 = Style.from(element, device, context2).computed(
      "background-color"
    );

    // Keywords can get tricky and may ultimately yield the same used value,
    // to keep on the safe side, if one color is a keyword we let the user decide.
    if (isKeyword(color1) || isKeyword(color2)) {
      return false;
    }

    // Technically, different solid backgrounds could render as the same color if one is fully transparent
    // and the parent happens to have the same color… We Assume that this won't happen often…
    return !color1.equals(color2);
  };
}
