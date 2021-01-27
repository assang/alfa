import * as React from "react";

import { Style } from "../style";

const style = Style.of({
  summary: {
    "&::-webkit-details-marker": {
      display: "none",
    },
  },

  indicator: {
    float: "left",

    "&::before": {
      display: "inline-block",
      width: "1rem",
      paddingRight: "0.5rem",
      content: `"\\25b8"`,
      textAlign: "center",

      "[open] > $summary > &": {
        content: `"\\25be"`,
      },
    },
  },
});

const { classes } = style;

Style.add(style);

export const Disclosure: React.FunctionComponent<Disclosure.Props> = (
  props
) => {
  const { children, summary } = props;

  return (
    <details>
      <summary className={classes.summary}>
        <span className={classes.indicator} aria-hidden="true" />
        <span>{summary}</span>
      </summary>

      <div>{children}</div>
    </details>
  );
};

export namespace Disclosure {
  export interface Props {
    summary: React.ReactNode;
  }
}
