import { Keyword, Token } from "@siteimprove/alfa-css";
import { Parser } from "@siteimprove/alfa-parser";

import { Property } from "../property";

import * as X from "./overflow-x";

const { map, option, pair, delimited } = Parser;

/**
 * @internal
 */
export type Specified =
  | Keyword<"visible">
  | Keyword<"hidden">
  | Keyword<"clip">
  | Keyword<"scroll">
  | Keyword<"auto">;

/**
 * @internal
 */
export type Computed = Specified;

/**
 * @internal
 */
export const parse = Keyword.parse(
  "visible",
  "hidden",
  "clip",
  "scroll",
  "auto"
);

/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-y}
 * @internal
 */
export default Property.of<Specified, Computed>(
  Keyword.of("visible"),
  parse,
  (overflowY, style) =>
    overflowY.map((y) => {
      if (y.value !== "visible" && y.value !== "clip") {
        return y;
      }

      const x = style.specified("overflow-x").value as X.Specified;

      if (x.value === "visible" || x.value === "clip") {
        return y;
      }

      return y.value === "visible" ? Keyword.of("auto") : Keyword.of("hidden");
    })
);
