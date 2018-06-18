import { Role } from "../../types";
import { Roletype } from "./roletype";

/**
 * @see https://www.w3.org/TR/wai-aria/#widget
 */
export const Widget: Role = {
  name: "widget",
  abstract: true,
  inherits: () => [Roletype]
};
