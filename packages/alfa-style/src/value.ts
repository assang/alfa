import { Declaration } from "@siteimprove/alfa-dom";
import { Equatable } from "@siteimprove/alfa-equatable";
import { Functor } from "@siteimprove/alfa-functor";
import { Serializable } from "@siteimprove/alfa-json";
import { Mapper } from "@siteimprove/alfa-mapper";
import { Monad } from "@siteimprove/alfa-monad";
import { Option, None } from "@siteimprove/alfa-option";
import { Predicate } from "@siteimprove/alfa-predicate";

import * as json from "@siteimprove/alfa-json";

export class Value<T = unknown>
  implements Functor<T>, Monad<T>, Iterable<T>, Equatable, Serializable {
  public static of<T>(value: T, source: Option<Declaration> = None): Value<T> {
    return new Value(value, source);
  }

  private readonly _value: T;
  private readonly _source: Option<Declaration>;

  private constructor(value: T, source: Option<Declaration>) {
    this._value = value;
    this._source = source;
  }

  public get value(): T {
    return this._value;
  }

  public get source(): Option<Declaration> {
    return this._source;
  }

  public map<U>(mapper: Mapper<T, U>): Value<U> {
    return new Value(mapper(this._value), this._source);
  }

  public flatMap<U>(mapper: Mapper<T, Value<U>>): Value<U> {
    return mapper(this._value);
  }

  public includes(value: T): boolean {
    return Equatable.equals(this._value, value);
  }

  public some(predicate: Predicate<T, [Option<Declaration>]>): boolean {
    return predicate(this._value, this._source);
  }

  public none(predicate: Predicate<T, [Option<Declaration>]>): boolean {
    return !predicate(this._value, this._source);
  }

  public equals(value: unknown): value is this {
    return (
      value instanceof Value &&
      Equatable.equals(value._value, this._value) &&
      value._source.equals(this._source)
    );
  }

  public *[Symbol.iterator](): Iterator<T> {
    yield this._value;
  }

  public toJSON(): Value.JSON {
    return {
      value: Serializable.toJSON(this._value),
      source: this._source.map((source) => source.toJSON()).getOr(null),
    };
  }

  public toString(): string {
    return `${this._value}`;
  }
}

export namespace Value {
  export interface JSON {
    [key: string]: json.JSON;
    value: json.JSON;
    source: Declaration.JSON | null;
  }
}
