import { Parser } from "@siteimprove/alfa-parser";
import { Slice } from "@siteimprove/alfa-slice";

import { Token } from "../syntax/token";
import { Numeric } from "./numeric";

const { map } = Parser;

/**
 * {@link https://drafts.csswg.org/css-values/#percentages}
 *
 * @public
 */
export class Percentage extends Numeric<"percentage"> {
  public static of(value: number): Percentage {
    return new Percentage(value);
  }

  private constructor(value: number) {
    super(value);
  }

  public get type(): "percentage" {
    return "percentage";
  }

  public equals(value: unknown): value is this {
    return value instanceof Percentage && super.equals(value);
  }

  public toJSON(): Percentage.JSON {
    return {
      type: "percentage",
      value: this._value,
    };
  }

  public toString(): string {
    return `${this._value * 100}%`;
  }
}

/**
 * @public
 */
export namespace Percentage {
  export interface JSON extends Numeric.JSON<"percentage"> {
    value: number;
  }

  export function isPercentage(value: unknown): value is Percentage {
    return value instanceof Percentage;
  }

  export const parse: Parser<
    Slice<Token>,
    Percentage,
    string
  > = map(Token.parsePercentage(), (percentage) =>
    Percentage.of(percentage.value)
  );
}
