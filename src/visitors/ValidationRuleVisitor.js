import { mapToObject } from 'utils/utils';
import { rootContext } from 'contexts/RootContext';
import CONSTANTS from 'configuration/constants';

export default class {
    traverse(context) {
        //go to the root
        let root = context;
        while (root.parent !== rootContext) {
            root = root.parent;
        }

        //breadth first
        this.validationRules = this.visit(root, {});
    }

    visit(context, previousLeafState) {
        const leaves = context.getLeaves(CONSTANTS.LEAF.VALIDATION_RULO);

        //Override the previous leaf state
        const leafState = {
            ...previousLeafState,
            ...mapToObject(leaves, x => [x.prop(CONSTANTS.PROP.RULE), x.prop(CONSTANTS.PROP.VALIDATE)])
        };
        const branchState = mapToObject(context.branches, branch => [branch.prop(CONSTANTS.PROP.NAME), this.visit(branch, leafState)]);

        return {
            ...branchState,
            [CONSTANTS.STATE.VALIDATIONS]: leafState,
        }
    }
}
