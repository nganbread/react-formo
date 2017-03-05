import some from 'lodash/some';
import remove from 'lodash/remove';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import find from 'lodash/find';

export default class BranchContext{
    constructor(component, parent) {

        this.component = component;
        this.parent = parent;

        if (!isString(component.props.name) && !isNumber(component.props.name)) throw 'Component must have an indexable name'

        this.branches = [];
        this.leaves = {};
    }

    branch(component) {
        let existing = find(this.branches, branch => branch.component === component);
        if (!existing) {
            //keep branches unique
            existing = new BranchContext(component, this);
            this.branches.push(existing);
        }

        return existing;
    }

    name(){
        return this.component.props.name
    }

    prune(component) {
        remove(this.branches, branch => branch.component === component);
    }

    leaf(type, component) {
        this.leaves[type] = this.leaves[type] || [];
        if (!some(this.leaves, leaf => leaf.component === component)) {
            //keep leaves unique
            this.leaves[type].push(component);
        }
    }

    deleaf(type, component) {

        remove(this.leaves[type] || [], component);
    }

    getLeaves(type) {
        return this.leaves[type] || [];
    }
}

