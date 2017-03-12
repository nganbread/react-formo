import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import isFunction from 'lodash/isFunction';
import map from 'lodash/map';
import keyBy from 'lodash/keyBy';
import filter from 'lodash/filter';
import mapValues from 'lodash/mapValues';
import reduce from 'lodash/reduce';
import toPath from 'lodash/toPath';

export function keys(o) {
    if (!o) return [];

    if (isFunction(o)) {
        return keys(o());
    }

    if (!isArray(o)) {
        if (isObject(o)) {
            o = map(o, (value, key) => value ? key : null);
        }

        if (isString(o)) {
            o = map(o.split(','), x => x.trim());
        }
    }

    if (!isArray(o)) throw 'what else could it be?'

    return filter(o);
}

export function mapToObject(array, selector) {
    //mapToObject([{a:'b', c: 4}], x => [x.a, x.c])
    //{b: 4}

    const pairs = map(array, selector);
    const pairsObject = keyBy(pairs, '[0]');
    return mapValues(pairsObject, '[1]');
}

export function pathProperty(o, path) {
    //pathProperty({a: [{b: 'c'}]}, 'a[0].b')
    //'c'
    const components = toPath(path);
    return reduce(components, (next, key) => next[key], o);
}