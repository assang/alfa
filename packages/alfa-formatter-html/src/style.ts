/// <reference types="node" />

import * as crypto from "crypto";

import jss, { SheetsRegistry, StyleSheet, Styles } from "jss";

jss.setup({
  ...require("jss-preset-default").default(),

  createGenerateId: () => (rule, sheet) =>
    rule.key +
    "-" +
    crypto
      .createHash("sha256")
      .update(rule.toString())
      .digest("hex")
      .substring(0, 6),
});

export namespace Style {
  const registry = new SheetsRegistry();

  export function of<N extends string>(
    styles: Partial<Styles<N>>
  ): StyleSheet<N> {
    return jss.createStyleSheet(styles);
  }

  export function add<N extends string>(sheet: StyleSheet<N>): void {
    registry.add(sheet);
  }

  export function toString(): string {
    return registry.toString();
  }
}
