import { lex, parse } from "@siteimprove/alfa-lang";
import { Assertions, test } from "@siteimprove/alfa-test";
import { Alphabet } from "../../../../src/alphabet";
import { FontSizeGrammar } from "../../../../src/properties/font/size/grammar";
import { FontSize } from "../../../../src/properties/font/types";

function fontSize(t: Assertions, input: string, expected: FontSize) {
  const lexer = lex(input, Alphabet);
  const parser = parse(lexer.result, FontSizeGrammar);

  t.deepEqual(parser.result, expected, input);
}

test("Can parse a px font size", t => {
  fontSize(t, "14px", {
    type: "length",
    value: 14,
    unit: "px"
  });
});

test("Can parse an em font size", t => {
  fontSize(t, "1.2em", {
    type: "percentage",
    value: 1.2,
    unit: "em"
  });
});

test("Can parse a % font size", t => {
  fontSize(t, "80%", {
    type: "percentage",
    value: 0.8
  });
});

test("Can parse an absolute font size", t => {
  fontSize(t, "small", {
    type: "absolute",
    value: "small"
  });
});

test("Can parse a relative font size", t => {
  fontSize(t, "smaller", {
    type: "relative",
    value: "smaller"
  });
});