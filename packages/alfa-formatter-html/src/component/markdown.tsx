import * as React from "react";

const remark = require("remark");

const process = remark()
  .use(require("remark-rehype"))
  .use(require("rehype-sanitize"))
  .use(require("rehype-react"), {
    createElement: React.createElement,
  });

export const Markdown: React.StatelessComponent<Markdown.Props> = (props) => {
  return process.processSync(props.markdown).result;
};

export namespace Markdown {
  export interface Props {
    markdown: string;
  }
}
