## API Report File for "@siteimprove/alfa-jasmine"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { Asserter } from '@siteimprove/alfa-assert';
import { Handler } from '@siteimprove/alfa-assert';
import { Mapper } from '@siteimprove/alfa-mapper';
import { Rule } from '@siteimprove/alfa-act';

// @public (undocumented)
export namespace Jasmine {
    // (undocumented)
    export function createPlugin<I, J, T = unknown, Q = never>(transform: Mapper<I, Promise<J>>, rules: Iterable<Rule<J, T, Q>>, handlers?: Iterable<Handler<J, T, Q>>, options?: Asserter.Options): void;
}


// (No @packageDocumentation comment for this package)

```