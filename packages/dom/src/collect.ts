import { Node } from "./types";
import { isParent, isChild } from "./guards";

type Predicate<T, U extends T> = ((n: T) => boolean) | ((n: T) => n is U);

export class Collector<T extends Node> implements Iterable<T> {
  readonly [Symbol.iterator]: () => Iterator<T>;

  /**
   * The context on which the collector operates. This is used as the root node
   * during iteration.
   */
  private readonly context: Node;

  /**
   * The predicate that determines the nodes generated by the collector. All
   * nodes that match this predicate will be yielded during iteration.
   */
  private readonly predicate: Predicate<Node, T>;

  constructor(context: Node, predicate: Predicate<Node, T> = () => true) {
    this.context = context;
    this.predicate = predicate;
    this[Symbol.iterator] = this.values;
  }

  public where<U extends T>(predicate: Predicate<T, U>): Collector<U> {
    return new Collector<U>(
      this.context,
      n => this.predicate(n) && predicate(n as T)
    );
  }

  public first(): T | null {
    for (const first of this) {
      return first;
    }

    return null;
  }

  public last(): T | null {
    let last: T | null = null;

    for (const next of this) {
      last = next;
    }

    return last;
  }

  *values(): Iterator<T> {
    const queue: Array<Node> = [];

    for (let next: Node | undefined = this.context; next; next = queue.pop()) {
      if (this.predicate(next)) {
        yield next as T;
      }

      if (isParent(next)) {
        const { children } = next;

        for (let i = children.length - 1; i >= 0; i--) {
          queue.push(children[i]);
        }
      }
    }
  }
}

export function collect(context: Node): Collector<Node> {
  return new Collector(context);
}

export function closest<T extends Node>(
  context: Node,
  predicate: Predicate<Node, T>
): T | null {
  for (
    let next: Node | null = context;
    next;
    next = isChild(next) ? next.parent : null
  ) {
    if (predicate(next)) {
      return next as T;
    }
  }

  return null;
}
