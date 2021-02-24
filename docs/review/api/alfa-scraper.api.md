## API Report File for "@siteimprove/alfa-scraper"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { Cookie } from '@siteimprove/alfa-http';
import { Device } from '@siteimprove/alfa-device';
import { Equatable } from '@siteimprove/alfa-equatable';
import { Header } from '@siteimprove/alfa-http';
import * as json from '@siteimprove/alfa-json';
import { Mapper } from '@siteimprove/alfa-mapper';
import { Page } from '@siteimprove/alfa-web';
import * as puppeteer from 'puppeteer';
import { Result } from '@siteimprove/alfa-result';
import { Serializable } from '@siteimprove/alfa-json';
import { Timeout } from '@siteimprove/alfa-time';
import { URL as URL_2 } from '@siteimprove/alfa-url';

// @public (undocumented)
export type Awaiter<T = unknown> = (page: puppeteer.Page, timeout: Timeout) => Promise<Result<T, string>>;

// @public (undocumented)
export namespace Awaiter {
    // (undocumented)
    export function duration(duration: number, after?: Awaiter<puppeteer.HTTPResponse | null>): Awaiter<puppeteer.HTTPResponse | null>;
    // (undocumented)
    export function idle(): Awaiter<puppeteer.HTTPResponse | null>;
    // (undocumented)
    export function loaded(): Awaiter<puppeteer.HTTPResponse | null>;
    // (undocumented)
    export function ready(): Awaiter<puppeteer.HTTPResponse | null>;
    // (undocumented)
    export function selector(selector: string): Awaiter<puppeteer.ElementHandle<Element> | null>;
    // (undocumented)
    export function xpath(expression: string): Awaiter<puppeteer.ElementHandle<Element> | null>;
}

// @public (undocumented)
export class Credentials implements Equatable, Serializable {
    // (undocumented)
    equals(value: unknown): value is this;
    // (undocumented)
    static of(username: string, password: string): Credentials;
    // (undocumented)
    get password(): string;
    // (undocumented)
    toJSON(): Credentials.JSON;
    // (undocumented)
    toString(): string;
    // (undocumented)
    get username(): string;
    }

// @public (undocumented)
export namespace Credentials {
    // (undocumented)
    export interface JSON {
        // (undocumented)
        [key: string]: json.JSON;
        // (undocumented)
        password: string;
        // (undocumented)
        username: string;
    }
}

// @public (undocumented)
export class Scraper {
    close(): Promise<void>;
    // (undocumented)
    static of(browser?: Promise<puppeteer.Browser>): Promise<Scraper>;
    scrape(url: string | URL_2, options?: Scraper.scrape.Options): Promise<Result<Page, string>>;
    // (undocumented)
    static with<T>(mapper: Mapper<Scraper, Promise<T>>, browser?: Promise<puppeteer.Browser>): Promise<T>;
}

// @public (undocumented)
export namespace Scraper {
    // (undocumented)
    export namespace scrape {
        // (undocumented)
        export interface Options {
            // (undocumented)
            readonly awaiter?: Awaiter;
            // (undocumented)
            readonly cookies?: Iterable<Cookie>;
            // (undocumented)
            readonly credentials?: Credentials;
            // (undocumented)
            readonly device?: Device;
            // (undocumented)
            readonly headers?: Iterable<Header>;
            // (undocumented)
            readonly screenshot?: Screenshot;
            // (undocumented)
            readonly timeout?: Timeout;
        }
    }
}

// @public (undocumented)
export class Screenshot implements Equatable, Serializable {
    // (undocumented)
    equals(value: unknown): value is this;
    // (undocumented)
    static of(path: string, type?: Screenshot.Type): Screenshot;
    // (undocumented)
    get path(): string;
    // (undocumented)
    toJSON(): Screenshot.JSON;
    // (undocumented)
    get type(): Screenshot.Type;
    }

// @public (undocumented)
export namespace Screenshot {
    // (undocumented)
    export interface JSON {
        // (undocumented)
        [key: string]: json.JSON;
        // (undocumented)
        path: string;
        // (undocumented)
        type: Type.JSON;
    }
    // (undocumented)
    export type Type = Type.PNG | Type.JPEG;
    // (undocumented)
    export namespace Type {
        // (undocumented)
        export class JPEG implements Equatable, Serializable {
            // (undocumented)
            equals(value: unknown): value is this;
            // (undocumented)
            static of(quality: number): JPEG;
            // (undocumented)
            get quality(): number;
            // (undocumented)
            toJSON(): JPEG.JSON;
            // (undocumented)
            get type(): "jpeg";
        }
        // (undocumented)
        export namespace JPEG {
            // (undocumented)
            export interface JSON {
                // (undocumented)
                [key: string]: json.JSON;
                // (undocumented)
                quality: number;
                // (undocumented)
                type: "jpeg";
            }
        }
        // (undocumented)
        export type JSON = PNG.JSON | JPEG.JSON;
        // (undocumented)
        export class PNG implements Equatable, Serializable {
            // (undocumented)
            get background(): boolean;
            // (undocumented)
            equals(value: unknown): value is this;
            // (undocumented)
            static of(background: boolean): PNG;
            // (undocumented)
            toJSON(): PNG.JSON;
            // (undocumented)
            get type(): "png";
        }
        // (undocumented)
        export namespace PNG {
            // (undocumented)
            export interface JSON {
                // (undocumented)
                [key: string]: json.JSON;
                // (undocumented)
                background: boolean;
                // (undocumented)
                type: "png";
            }
        }
    }
}


// (No @packageDocumentation comment for this package)

```