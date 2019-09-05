import { getDefaultDevice } from "@siteimprove/alfa-device";
import { test } from "@siteimprove/alfa-test";
import { jsx } from "../jsx";
import { getTabSequence } from "../src/get-tab-sequence";

const device = getDefaultDevice();

test("Gets the tab sequence of a node and its children", t => {
  const div = <div />;
  const a = <a href="#" />;
  const input = <input type="text" />;

  const context = (
    <div>
      {div}
      {a}
      {input}
    </div>
  );

  t.deepEqual(getTabSequence(context, context, device), [a, input]);
});

test("Sorts element based on their tab index", t => {
  const div = <div />;
  const a = <a tabindex="2" href="#" />;
  const button = <button />;
  const input = <input tabindex="1" type="text" />;

  const context = (
    <div>
      {div}
      {a}
      {button}
      {input}
    </div>
  );

  t.deepEqual(getTabSequence(context, context, device), [input, a, button]);
});

test("Leaves out elements with negative tab indices", t => {
  const div = <div />;
  const a = <a href="#" />;
  const input = <input tabindex="-1" type="text" />;

  const context = (
    <div>
      {div}
      {a}
      {input}
    </div>
  );

  t.deepEqual(getTabSequence(context, context, device), [a]);
});

test("Positions elements with the same tab indices in tree order", t => {
  const div = <div />;
  const button = <button />;
  const a = <a tabindex="1" href="#" />;
  const input = <input tabindex="1" type="text" />;

  const context = (
    <div>
      {div}
      {button}
      {a}
      {input}
    </div>
  );

  t.deepEqual(getTabSequence(context, context, device), [a, input, button]);
});

test("Positions elements with a tab index of zero after elements with a non-zero tab index", t => {
  const div = <div />;
  const button = <button tabindex="0" />;
  const a = <a tabindex="1" href="#" />;
  const input = <input tabindex="1" type="text" />;

  const context = (
    <div>
      {div}
      {button}
      {a}
      {input}
    </div>
  );

  t.deepEqual(getTabSequence(context, context, device), [a, input, button]);
});

test("Positions elements with tabindex larger than the array size in the correct order", t => {
  const div = <div />;
  const a = <a tabindex="6" href="#" />;
  const input = <input tabindex="1" type="text" />;

  const context = (
    <div>
      {div}
      {a}
      {input}
    </div>
  );

  t.deepEqual(getTabSequence(context, context, device), [input, a]);
});

test("Gets the tab sequence of elements in an iframe", t => {
  const div = <div />;
  const a = <a href="#" />;
  const input = <input type="text" />;

  const context = (
    <div>
      {div}
      {a}
      <iframe>
        <content>{input}</content>
      </iframe>
    </div>
  );

  t.deepEqual(getTabSequence(context, context, device), [a, input]);
});
