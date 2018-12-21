/**
 * Import ValueLink library
 * Define value links binding mixins to the Record and Collection
 */
import { Record } from 'type-r';
import { Link } from 'valuelink/lib/link';
export default Link;
export interface Collection<R extends Record = Record> {
    linkContains(record: Record): Link<boolean>;
    linkAt(prop: string): Link<any>;
}
