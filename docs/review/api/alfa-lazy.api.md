## API Report File for "@siteimprove/alfa-lazy"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { Equatable } from '@siteimprove/alfa-equatable';
import { Functor } from '@siteimprove/alfa-functor';
import { Mapper } from '@siteimprove/alfa-mapper';
import { Monad } from '@siteimprove/alfa-monad';
import { Serializable } from '@siteimprove/alfa-json';
import { Thunk } from '@siteimprove/alfa-thunk';

// @public (undocumented)
export class Lazy<T> implements Functor<T>, Monad<T>, Iterable<T>, Equatable, Serializable<Lazy.JSON<T>> {
    // (undocumented)
    [Symbol.iterator](): Iterator<T>;
    // (undocumented)
    equals<T>(value: Lazy<T>): boolean;
    // (undocumented)
    equals(value: unknown): value is this;
    // (undocumented)
    flatMap<U>(mapper: Mapper<T, Lazy<U>>): Lazy<U>;
    // (undocumented)
    static force<T>(value: T): Lazy<T>;
    // (undocumented)
    force(): T;
    // (undocumented)
    iterator(): Iterator<T>;
    // (undocumented)
    map<U>(mapper: Mapper<T, U>): Lazy<U>;
    // (undocumented)
    static of<T>(thunk: Thunk<T>): Lazy<T>;
    // (undocumented)
    toJSON(): Lazy.JSON<T>;
    // (undocumented)
    toString(): string;
    // (undocumented)
    toThunk(): Thunk<T>;
    }

// @public (undocumented)
export namespace Lazy {
    // (undocumented)
    export type JSON<T> = Serializable.ToJSON<T>;
}


// (No @packageDocumentation comment for this package)

```