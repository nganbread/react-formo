import CONSTANTS from 'configuration/constants';
import { mapToObject, keys } from 'utils/utils';

export default class {
    constructor(state) {
        this._state = state;
    }

    traverse(context) {
        this.value = this._visit(context);
    }

    _visit(context) {
        const leaves = context.getLeaves(CONSTANTS.LEAF.INPUTO);
        const leafValues = mapToObject(leaves, leaf => [leaf.prop(CONSTANTS.PROP.NAME), leaf.state(CONSTANTS.STATE.VALUE)]);

        const branchValues = mapToObject(context.branches, branch => [branch.prop(CONSTANTS.PROP.NAME), this._visit(branch)])

        return {
            ...leafValues,
            ...branchValues
        };
    }
}