import * as React from "react";

import { Style } from "../style";

const style = Style.of({
  list: {
    margin: 0,
    padding: 0,
  },

  item: {
    display: "block",
    backgroundColor: "#fff",
  },
});

const { classes } = style;

Style.add(style);

export const List: React.StatelessComponent<List.Props> = (props) => {
  const { ordered = false } = props;

  const items = props.items.map((item, index) => (
    <li className={classes.item} key={index}>
      {item}
    </li>
  ));

  return ordered ? (
    <ol className={classes.list}>{items}</ol>
  ) : (
    <ul className={classes.list}>{items}</ul>
  );
};

export namespace List {
  export interface Props {
    ordered?: boolean;
    items: Array<React.ReactNode>;
  }
}
