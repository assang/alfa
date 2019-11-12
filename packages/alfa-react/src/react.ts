import {
  Attribute,
  Element,
  Node,
  NodeType,
  Text
} from "@siteimprove/alfa-dom";
import { isBoolean, isObject, isString } from "@siteimprove/alfa-guards";
import { Page } from "@siteimprove/alfa-web";
import { isValidElement, ReactElement } from "react";
import * as TestRenderer from "react-test-renderer";

const { keys } = Object;

export namespace React {
  export type Type = ReactElement<unknown>;

  export function isType(value: unknown): value is Type {
    return isObject(value) && isValidElement(value);
  }

  export function asPage(value: Type): Page {
    const tree = TestRenderer.create(value).toJSON();

    if (tree === null) {
      throw new Error("Could not render React element");
    }

    return Page.of({
      document: {
        nodeType: NodeType.Document,
        styleSheets: [],
        childNodes: [asElement(tree)]
      }
    });
  }
}

type TestNode = TestElement | string;

type TestElement = TestRenderer.ReactTestRendererJSON;

function asNode(node: TestNode): Node {
  return isString(node) ? asText(node) : asElement(node);
}

function asElement(element: TestElement): Element {
  const { type: localName, props, children } = element;

  const attributes = keys(props).reduce<Array<Attribute>>(
    (attributes, prop) => {
      const attribute = asAttribute(prop, props[prop]);

      if (attribute !== null) {
        attributes.push(attribute);
      }

      return attributes;
    },
    []
  );

  const childNodes: Array<Node> = children === null ? [] : children.map(asNode);

  return {
    nodeType: NodeType.Element,
    prefix: null,
    localName,
    attributes,
    shadowRoot: null,
    childNodes
  };
}

function asAttribute(localName: string, value: unknown): Attribute | null {
  switch (value) {
    // Attributes that are either `null` or `undefined` are always ignored.
    case null:
    case undefined:
      return null;
  }

  localName = asAttributeName(localName);
  value = asAttributeValue(localName, value);

  if (!isString(value)) {
    return null;
  }

  return {
    nodeType: NodeType.Attribute,
    prefix: null,
    localName,
    value,
    childNodes: []
  };
}

function asAttributeName(localName: string): string {
  switch (localName) {
    case "className":
      return "class";

    case "htmlFor":
      return "for";
  }

  return localName;
}

function asAttributeValue(localName: string, value: unknown): string | null {
  switch (localName) {
    case "style":
      if (isObject(value)) {
        return asInlineStyle(value);
      }
  }

  if (localName.startsWith("aria-") && isBoolean(value)) {
    return String(value);
  }

  switch (value) {
    case false:
      return null;

    case true:
      return localName;
  }

  return String(value);
}

function asText(data: string): Text {
  return {
    nodeType: NodeType.Text,
    data,
    childNodes: []
  };
}

function asInlineStyle(props: { [key: string]: unknown }): string {
  let style = "";
  let delimiter = "";

  for (const prop of keys(props)) {
    if (props[prop]) {
      style += prop.replace(/([A-Z])/g, "-$1").toLowerCase();
      style += ":";
      style += String(props[prop]);
      style += delimiter;

      delimiter = ";";
    }
  }

  return style;
}