import { Alphabet } from "../../../src/alphabet";
import { Char } from "../../../src/char";
import { isNumeric } from "../../../src/is-numeric";
import { isWhitespace } from "../../../src/is-whitespace";
import { Pattern } from "../../../src/types";

export const enum TokenType {
  Number,
  Add,
  Subtract,
  Multiply,
  Divide,
  Exponentiate
}

export type Number = Readonly<{ type: TokenType.Number; value: number }>;
export type Add = Readonly<{ type: TokenType.Add }>;
export type Subtract = Readonly<{ type: TokenType.Subtract }>;
export type Multiply = Readonly<{ type: TokenType.Multiply }>;
export type Divide = Readonly<{ type: TokenType.Divide }>;
export type Exponentiate = Readonly<{ type: TokenType.Exponentiate }>;

export type ExpressionToken =
  | Number
  | Add
  | Subtract
  | Multiply
  | Divide
  | Exponentiate;

export type ExpressionPattern = Pattern<ExpressionToken>;

export function isNumber(token: ExpressionToken): token is Number {
  return token.type === TokenType.Number;
}

const initial: ExpressionPattern = (stream, emit, state, { exit }) => {
  stream.accept(isWhitespace);

  const char = stream.peek(0);

  if (char === null) {
    return exit;
  }

  if (isNumeric(char)) {
    return number;
  }

  stream.advance(1);

  switch (char) {
    case Char.PlusSign:
      emit({ type: TokenType.Add });
      break;
    case Char.HyphenMinus:
      emit({ type: TokenType.Subtract });
      break;
    case Char.Asterisk:
      emit({ type: TokenType.Multiply });
      break;
    case Char.Solidus:
      emit({ type: TokenType.Divide });
      break;
    case Char.CircumflexAccent:
      emit({ type: TokenType.Exponentiate });
  }

  return initial;
};

const number: ExpressionPattern = (stream, emit) => {
  const result: Array<number> = [];

  stream.accept(isNumeric, result);

  emit({
    type: TokenType.Number,
    value: result.reduce((value, char) => 10 * value + char - Char.DigitZero, 0)
  });

  return initial;
};

export const ExpressionAlphabet: Alphabet<ExpressionToken> = new Alphabet(
  initial,
  () => null
);
