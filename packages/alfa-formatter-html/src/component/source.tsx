import * as React from "react";

import * as dom from "@siteimprove/alfa-dom";

import { Style } from "../style";

const style = Style.of({
  source: {
    margin: 0,
    padding: "1rem",
    color: "#545454",
    listStyle: "none",
    fontFamily: "monospace",
    wordBreak: "break-all",
  },

  node: {
    listStyle: "none",
    marginLeft: "-1px",
    paddingLeft: "1em",
    borderColor: "transparent",
    borderStyle: "solid",
    borderWidth: 0,
    borderLeftWidth: "2px",

    "&:target": {
      backgroundColor: "rgba(255, 0, 0, 0.05)",
      borderLeftColor: "red",
    },
  },

  children: {
    margin: 0,
    padding: 0,
    borderLeft: "1px solid rgba(0, 0, 0, 0.125)",
  },

  attribute: {
    marginBottom: "-2px",
    borderColor: "transparent",
    borderStyle: "solid",
    borderWidth: 0,
    borderBottomWidth: "2px",

    "&:target": {
      backgroundColor: "rgba(255, 0, 0, 0.05)",
      borderBottomColor: "red",
    },

    "& span": {
      color: "#aa5d00",
    },
  },

  text: {
    composes: "$node",

    "& pre": {
      margin: 0,
      whiteSpace: "pre-wrap",
    },
  },

  type: {
    composes: "$node",
    color: "#696969",
  },

  tag: {
    color: "#007faa",
  },
});

const { classes } = style;

Style.add(style);

export const Source: React.StatelessComponent<Source.Props> = (props) => {
  const { source } = props;

  return (
    <ol className={classes.source} role="tree">
      <Node source={source} />
    </ol>
  );
};

export namespace Source {
  export interface Props {
    source: dom.Node;
  }
}

const Node: React.StatelessComponent<Node.Props> = (props) => {
  const { source } = props;

  if (dom.Element.isElement(source)) {
    return <Element source={source} />;
  }

  if (dom.Attribute.isAttribute(source)) {
    return <Attribute source={source} />;
  }

  if (dom.Text.isText(source)) {
    return <Text source={source} />;
  }

  if (dom.Document.isDocument(source)) {
    return <Document source={source} />;
  }

  if (dom.Type.isType(source)) {
    return <Type source={source} />;
  }

  if (dom.Shadow.isShadow(source)) {
    return <Shadow source={source} />;
  }

  return null;
};

namespace Node {
  export interface Props {
    source: dom.Node;
  }
}

const Document: React.StatelessComponent<Document.Props> = (props) => {
  const { source } = props;

  const children = source.children();

  return (
    <li
      className={classes.node}
      role="treeitem"
      id={source.path({ composed: true, nested: true })}
      tabIndex={-1}
    >
      <code>#document</code>

      {children.isEmpty() ? null : (
        <ol className={classes.children} role="group">
          {children.map((child, index) => (
            <Node source={child} key={index} />
          ))}
        </ol>
      )}
    </li>
  );
};

namespace Document {
  export interface Props {
    source: dom.Document;
  }
}

const Type: React.StatelessComponent<Type.Props> = (props) => {
  const { source } = props;

  return (
    <li
      className={classes.type}
      role="treeitem"
      id={source.path({ composed: true, nested: true })}
      tabIndex={-1}
    >
      <code>
        {"<!doctype "}
        {source.name}
        {">"}
      </code>
    </li>
  );
};

namespace Type {
  export interface Props {
    source: dom.Type;
  }
}

const Shadow: React.StatelessComponent<Shadow.Props> = (props) => {
  const { source } = props;

  const children = source.children();

  return (
    <li
      className={classes.node}
      role="treeitem"
      id={source.path({ composed: true, nested: true })}
      tabIndex={-1}
    >
      <code>#shadow-root ({source.mode})</code>

      {children.isEmpty() ? null : (
        <ol className={classes.children} role="group">
          {children.map((child, index) => (
            <Node source={child} key={index} />
          ))}
        </ol>
      )}
    </li>
  );
};

namespace Shadow {
  export interface Props {
    source: dom.Shadow;
  }
}

const Element: React.StatelessComponent<Element.Props> = (props) => {
  const { source } = props;

  const children = source.children({
    composed: true,
    nested: true,
  });

  return (
    <li
      className={classes.node}
      role="treeitem"
      id={source.path({ composed: true, nested: true })}
      tabIndex={-1}
    >
      <code>
        {"<"}

        <span className={classes.tag}>{source.name}</span>

        {[...source.attributes].map((attribute, index) => [
          " ",
          <Attribute source={attribute} key={index} />,
        ])}

        {">"}
      </code>

      {children.isEmpty() ? null : (
        <ol className={classes.children} role="group">
          {children.map((child, index) => (
            <Node source={child} key={index} />
          ))}
        </ol>
      )}

      {source.isVoid() ? null : (
        <code>
          {"</"}

          <span className={classes.tag}>{source.name}</span>

          {">"}
        </code>
      )}
    </li>
  );
};

namespace Element {
  export interface Props {
    source: dom.Element;
  }
}

const Attribute: React.StatelessComponent<Attribute.Props> = (props) => {
  const { source } = props;

  return (
    <span
      className={classes.attribute}
      id={source.path({ composed: true, nested: true })}
      tabIndex={-1}
    >
      <span>{source.name}</span>
      {'="'}
      <span>{source.value}</span>
      {'"'}
    </span>
  );
};

namespace Attribute {
  export interface Props {
    source: dom.Attribute;
  }
}

const Text: React.StatelessComponent<Text.Props> = (props) => {
  const { source } = props;
  const { data } = source;

  if (data.trim() === "") {
    return null;
  }

  return (
    <li
      className={classes.text}
      role="treeitem"
      id={source.path({ composed: true, nested: true })}
      tabIndex={-1}
    >
      <pre>
        <code>"{data}"</code>
      </pre>
    </li>
  );
};

namespace Text {
  export interface Props {
    source: dom.Text;
  }
}
