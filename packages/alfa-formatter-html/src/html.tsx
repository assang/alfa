import * as React from "react";
import * as ReactDOM from "react-dom/server";

import { Outcome } from "@siteimprove/alfa-act";
import { Node } from "@siteimprove/alfa-dom";
import { Formatter } from "@siteimprove/alfa-formatter";
import { Page } from "@siteimprove/alfa-web";

import { Style } from "./style";

import { Disclosure } from "./component/disclosure";
import { List } from "./component/list";
import { Markdown } from "./component/markdown";
import { Source } from "./component/source";

const style = Style.of({
  "@global": {
    "*, *:before, *:after": {
      boxSizing: "inherit",
    },

    html: {
      boxSizing: "border-box",
      fontSize: "0.875em",
      fontFamily: "sans-serif",
      lineHeight: 1.5,
    },

    body: {
      margin: 0,
    },

    ":focus": {
      outline: "#005ecc auto 1px",

      "&:not(:focus-visible)": {
        outlineWidth: 0,
      },
    },
  },

  report: {
    display: "flex",
    height: "100vh",
  },

  scrollable: {
    flex: 1,
    overflow: "scroll",
  },

  outcomes: {
    composes: "$scrollable",
    flex: "0 0 25%",
    padding: "1rem",

    "& li": {
      "&:first-child": {
        "& details": {
          "&, & > summary": {
            borderTopRightRadius: "0.25rem",
            borderTopLeftRadius: "0.25rem",
          },
        },
      },

      "& + li": {
        marginTop: "-1px",
      },
    },

    "& details": {
      border: "1px solid #dfdfdf",

      "& > summary": {
        padding: "0.75rem",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        cursor: "pointer",

        "&:hover": {
          backgroundColor: "#f8f9fa",
        },
      },

      "&[open] > summary": {
        "&, &:hover": {
          margin: "-1px",
          backgroundColor: "#007bff",
          border: "1px solid #007bff",

          "&, & a": {
            color: "#fff",
          },
        },
      },

      "& > div": {
        padding: "0.75rem",
        borderTop: "1px solid rgb(0, 0, 0, 0.05)",
      },
    },
  },
});

const { classes } = style;

Style.add(style);

export default function <Q>(): Formatter<Page, Node | Iterable<Node>, Q> {
  return function HTML(page, outcomes) {
    const markup = ReactDOM.renderToStaticMarkup(
      <html lang="en">
        <meta charSet="utf-8" />

        <title>Results for {page.response.url}</title>

        <style dangerouslySetInnerHTML={{ __html: Style.toString() }} />

        <main className={classes.report}>
          <div className={classes.outcomes}>
            <List
              items={[...outcomes]
                .map((outcome, index) => {
                  const target = outcome.target;

                  if (Node.isNode(target)) {
                    const path = target.path({ composed: true, nested: true });

                    return (
                      <Disclosure
                        summary={
                          <a href={"#" + path} title={path}>
                            {path}
                          </a>
                        }
                      >
                        {Outcome.isFailed(outcome) ||
                        Outcome.isPassed(outcome) ? (
                          <ol>
                            {outcome.expectations
                              .toArray()
                              .map(([id, expectation]) => {
                                if (expectation.isNone()) {
                                  return <li>Unknown</li>;
                                }

                                const result = expectation.get();

                                return (
                                  <li key={id}>
                                    <Markdown
                                      markdown={
                                        result.isOk()
                                          ? result.get()
                                          : result.getErr()
                                      }
                                    />
                                  </li>
                                );
                              })}
                          </ol>
                        ) : null}
                      </Disclosure>
                    );
                  }
                })
                .filter((item) => item !== undefined)}
            />
          </div>

          <div className={classes.scrollable}>
            <Source source={page.document} />
          </div>
        </main>
      </html>
    );

    return `<!doctype html>${markup}`;
  };
}
