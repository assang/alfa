import * as dom from "@siteimprove/alfa-dom";

import { Node } from "../node";

/**
 * @public
 */
export class Inert extends Node {
  public static of(owner: dom.Node): Inert {
    return new Inert(owner);
  }

  private constructor(owner: dom.Node) {
    super(owner, []);
  }

  public clone(): Inert {
    return new Inert(this._node);
  }

  public isIgnored(): boolean {
    return true;
  }

  public toJSON(): Inert.JSON {
    return {
      type: "inert",
      node: this._node.path(),
      children: this._children.map((child) => child.toJSON()),
    };
  }

  public toString(): string {
    return "ignored";
  }
}

/**
 * @public
 */
export namespace Inert {
  export interface JSON extends Node.JSON {
    type: "inert";
  }
}
