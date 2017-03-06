import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';

export default class LeafContext{
    constructor(component, parent) {

        this._component = component;
        this.parent = parent;

        if (!isString(component.props.name) && !isNumber(component.props.name)) throw 'Component must have an indexable name'
    }

    prop(name){
        return this._component.props[name];
    }

    setState(...args){
        return this._component.setState(...args);
    }
}
