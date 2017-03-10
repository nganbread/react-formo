import LeafContext from './LeafContext';
import some from 'lodash/some';
import remove from 'lodash/remove';
import find from 'lodash/find';

export default class BranchContext extends LeafContext {
    constructor(...args) {
        super(...args)

        this.branches = [];
        this.leaves = {};
    }

    branch(component) {
        let existing = find(this.branches, branch => branch._component === component);
        if (!existing) {
            //keep branches unique
            existing = new BranchContext(component, this);
            this.branches.push(existing);
        }

        return existing;
    }

    prune(component) {
        remove(this.branches, branch => branch._component === component);
    }
 
    leaf(type, component) {
        this.leaves[type] = this.leaves[type] || [];
        //keep leaves unique
        let leaf = find(this.leaves[type], leaf => leaf._component === component);
        if (!leaf) {
            leaf = new LeafContext(component, this);
            this.leaves[type].push(leaf);
        }
        return leaf;
    }

    deleaf(type, component) {
        remove(this.leaves[type] || [], leaf => leaf._component === component);
    }

    getLeaves(type) {
        return this.leaves[type] || [];
    }
}