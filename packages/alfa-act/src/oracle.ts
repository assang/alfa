import { Future } from "@siteimprove/alfa-future";
import { Option } from "@siteimprove/alfa-option";

import { Question } from "./question";
import { Rule } from "./rule";

/**
 * @public
 */
export type Oracle<I, T, Q> = <A>(
  rule: Rule<I, T, Q>,
  question: { [K in keyof Q]: Question<K, T, Q[K], A> }[keyof Q]
) => Future<Option<A>>;
