/**
 * Import ValueLink library
 * Define value links binding mixins to the Record and Collection
 */
import { Record } from 'type-r';
declare module 'type-r/lib/record/record' {
    interface Record extends LinkedRecordMixin {
    }
}
import { Link } from 'valuelink/lib/link';
export default Link;
interface LinksCache {
    [key: string]: RecordLink;
}
/**
 * Record
 */
declare class LinkedRecordMixin {
    _links: LinksCache;
    AttributesCopy: new (attrs: object) => object;
    attributes: object;
    linkAt<K extends keyof this>(key: K): Link<this[K]>;
    linkPath(path: string, options?: {}): RecordDeepLink;
    linkAll(): LinksCache;
}
/**
 * Link to Type-R's record attribute.
 * Strict evaluation of value, lazy evaluation of validation error.
 * Links are cached in the records
 */
declare class RecordLink extends Link<any> {
    record: any;
    attr: any;
    constructor(record: any, attr: any, value: any);
    set(x: any): void;
    _error?: any;
    error: any;
    assignFrom(other: Record): void;
}
declare class RecordDeepLink extends Link<any> {
    record: any;
    path: any;
    options: any;
    constructor(record: any, path: any, options: any);
    _error?: any;
    error: any;
    readonly _changeToken: any;
    set(x: any): void;
    assignFrom(other: Record): void;
}
