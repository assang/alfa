import { Equatable } from "@siteimprove/alfa-equatable";
import { Serializable } from "@siteimprove/alfa-json";
import { Parser } from "@siteimprove/alfa-parser";
import { Err, Result } from "@siteimprove/alfa-result";
import { Slice } from "@siteimprove/alfa-slice";

import { Block } from "./block";
import { Function } from "./function";
import { Token } from "./token";

/**
 * {@link https://drafts.csswg.org/css-syntax/#component-value}
 *
 * @public
 */
export class Component implements Iterable<Token>, Equatable, Serializable {
  public static of(value: Iterable<Token>): Component {
    return new Component(Array.from(value));
  }

  private readonly _value: Array<Token>;

  private constructor(value: Array<Token>) {
    this._value = value;
  }

  public get value(): Array<Token> {
    return this._value;
  }

  public *[Symbol.iterator](): Iterator<Token> {
    yield* this._value;
  }

  public equals(value: unknown): value is this {
    return (
      value instanceof Component &&
      value._value.length === this._value.length &&
      value._value.every((token, i) => token.equals(this._value[i]))
    );
  }

  public toJSON(): Component.JSON {
    return this._value.map((token) => token.toJSON());
  }

  public toString(): string {
    return this._value.join("");
  }
}

/**
 * @public
 */
export namespace Component {
  export type JSON = Array<Token.JSON>;

  /**
   * {@link https://drafts.csswg.org/css-syntax/#consume-a-component-value}
   */
  export const consume: Parser<Slice<Token>, Component, string> = (input) => {
    if (input.length === 0) {
      return Err.of("Unexpected end of file");
    }

    const next = input.array[input.offset];

    if (
      Token.isOpenParenthesis(next) ||
      Token.isOpenSquareBracket(next) ||
      Token.isOpenCurlyBracket(next)
    ) {
      return Block.consume(input).map(([input, value]) => [
        input,
        Component.of(value),
      ]);
    }

    if (Token.isFunction(next)) {
      return Function.consume(input).map(([input, value]) => [
        input,
        Component.of(value),
      ]);
    }

    return Result.of([input.slice(1), Component.of([next])]);
  };

  /**
   * {@link https://drafts.csswg.org/css-syntax/#parse-component-value}
   */
  export const parse: Parser<Slice<Token>, Component, string> = (input) => {
    while (Token.isWhitespace(input.array[input.offset])) {
      input = input.slice(1);
    }

    if (input.length === 0) {
      return Err.of("Unexpected end of input");
    }

    const component = consume(input);

    while (Token.isWhitespace(input.array[input.offset])) {
      input = input.slice(1);
    }

    if (input.length !== 0) {
      return Err.of("Expected end of input");
    }

    return component;
  };
}
