import { Device } from "@siteimprove/alfa-device";
import { Document, Element } from "@siteimprove/alfa-dom";
import { jsx } from "@siteimprove/alfa-dom/jsx";
import { Predicate } from "@siteimprove/alfa-predicate";
import { test } from "@siteimprove/alfa-test";
import { hasId } from "../../src/common/predicate/has-id";

const { and, equals } = Predicate;
const { isElement } = Element;

import R45, { Outcomes } from "../../src/sia-r45/rule";
import { evaluate } from "../common/evaluate";
import { failed, inapplicable, passed } from "../common/outcome";

const device = Device.standard();

test("Pass when tokens in headers list refer to cells in the same table", async (t) => {
  const document = Document.of((self) => [
    Element.fromElement(
      <table>
        <thead>
          <tr>
            <th id="header1">Projects</th>
            <th id="header2">Exams</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td id="target" colSpan={2} headers="header1 header2">
              15%
            </td>
          </tr>
        </tbody>
      </table>
    ),
  ]);
  const target = document
    .descendants()
    .find(and(isElement, hasId(equals("target"))))
    .get()
    .attribute("headers")
    .get();

  t.deepEqual(await evaluate(R45, { device, document }), [
    passed(R45, target, { 1: Outcomes.HeadersRefersToCellInTable }),
  ]);
});

test("Fail when some tokens in headers list do not refer to cells in the same table", async (t) => {
  const document = Document.of((self) => [
    Element.fromElement(
      <table>
        <thead>
          <tr>
            <th id="header1">Projects</th>
            <th>Exams</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td id="target" colSpan={2} headers="header1 header2">
              15%
            </td>
          </tr>
        </tbody>
      </table>
    ),
  ]);
  const target = document
    .descendants()
    .find(and(isElement, hasId(equals("target"))))
    .get()
    .attribute("headers")
    .get();

  t.deepEqual(await evaluate(R45, { device, document }), [
    failed(R45, target, { 1: Outcomes.HeadersDoesNotReferToCellsInTable }),
  ]);
});

test("Is inapplicable when there is no headers attribute", async (t) => {
  const document = Document.of((self) => [
    Element.fromElement(
      <table>
        <thead>
          <tr>
            <th id="header1">Projects</th>
            <th id="header2">Exams</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={2}>15%</td>
          </tr>
        </tbody>
      </table>
    ),
  ]);

  t.deepEqual(await evaluate(R45, { device, document }), [inapplicable(R45)]);
});