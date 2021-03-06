import { Role } from "@siteimprove/alfa-aria";
import { Element } from "@siteimprove/alfa-dom";
import { Predicate } from "@siteimprove/alfa-predicate";

const { equals, property } = Predicate;

export function hasExplicitRole(
  predicate?: Predicate<Role>
): Predicate<Element>;

export function hasExplicitRole<N extends Role.Name>(
  name: N,
  ...rest: Array<N>
): Predicate<Element>;

export function hasExplicitRole(
  nameOrPredicate: Predicate<Role> | Role.Name | undefined,
  ...names: Array<Role.Name>
): Predicate<Element> {
  let predicate: Predicate<Role>;

  if (typeof nameOrPredicate === "function") {
    predicate = nameOrPredicate;
  } else {
    predicate = property("name", equals(nameOrPredicate, ...names));
  }

  return (element) => Role.fromExplicit(element).some(predicate);
}
