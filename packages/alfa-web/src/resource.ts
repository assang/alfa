import { Request, Response } from "@siteimprove/alfa-http";
import { Refinement } from "@siteimprove/alfa-refinement";

const { isObject } = Refinement;

/**
 * {@link https://en.wikipedia.org/wiki/Web_resource}
 *
 * @public
 */
export interface Resource {
  readonly request: Request;
  readonly response: Response;
}

/**
 * @public
 */
export namespace Resource {
  export function isResource(value: unknown): value is Resource {
    return (
      isObject(value) &&
      Request.isRequest(value.request) &&
      Response.isResponse(value.response)
    );
  }
}
