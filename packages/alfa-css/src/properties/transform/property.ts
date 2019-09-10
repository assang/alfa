import { parse } from "@siteimprove/alfa-lang";
import { Canonical, canonicalize } from "../../canonicalize";
import { Longhand } from "../../properties";
import { Values } from "../../values";
import { getSpecifiedProperty } from "../helpers/get-property";
import { TransformGrammar } from "./grammar";
import { Transform } from "./types";

/**
 * @see https://drafts.csswg.org/css-transforms/#propdef-transform
 */
export const transform: Longhand<Transform, Canonical<Transform>> = {
  parse(input) {
    const parser = parse(input, TransformGrammar);

    if (!parser.done) {
      return null;
    }

    return parser.result;
  },
  initial() {
    return Values.keyword("none");
  },
  computed(style) {
    const { value, source } = getSpecifiedProperty(style, "transform");
    return { value: canonicalize(value), source };
  }
};