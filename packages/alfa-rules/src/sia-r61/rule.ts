import { Rule, Diagnostic } from "@siteimprove/alfa-act";
import { Document, Element } from "@siteimprove/alfa-dom";
import { Predicate } from "@siteimprove/alfa-predicate";
import { Refinement } from "@siteimprove/alfa-refinement";
import { Err, Ok } from "@siteimprove/alfa-result";
import { Page } from "@siteimprove/alfa-web";

import { expectation } from "../common/expectation";

import { hasChild } from "../common/predicate/has-child";
import { hasHeadingLevel } from "../common/predicate/has-heading-level";
import { hasRole } from "../common/predicate/has-role";
import { isDocumentElement } from "../common/predicate/is-document-element";
import { isIgnored } from "../common/predicate/is-ignored";

const { isElement } = Element;
const { equals, not } = Predicate;
const { and } = Refinement;

export default Rule.Atomic.of<Page, Document>({
  uri: "https://siteimprove.github.io/sanshikan/rules/sia-r61.html",
  evaluate({ device, document }) {
    const firstHeading = document
      .descendants({ flattened: true })
      .filter(and(isElement, not(isIgnored(device))))
      .find(hasRole("heading"));

    return {
      applicability() {
        return hasChild(isDocumentElement)(document) && firstHeading.isSome()
          ? [document]
          : [];
      },

      expectations(target) {
        return {
          1: expectation(
            hasHeadingLevel(device, equals(1))(firstHeading.get()),
            () => Outcomes.StartWithLevel1Heading,
            () => Outcomes.StartWithHigherLevelHeading
          ),
        };
      },
    };
  },
});

export namespace Outcomes {
  export const StartWithLevel1Heading = Ok.of(
    Diagnostic.of(`The document starts with a level 1 heading`)
  );

  export const StartWithHigherLevelHeading = Err.of(
    Diagnostic.of(`The document does not start with a level 1 heading`)
  );
}
