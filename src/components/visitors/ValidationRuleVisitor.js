import { mapToObject } from './../../utils/utils';
import { rootContext } from './../contexts/RootContext';

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
        const leaves = context.getLeaves('VALIDATION_RULE');

        //Override the previous leaf state
        const leafState = {
            ...previousLeafState,
            ...mapToObject(leaves, x => [x.prop('rule'), x.prop('validate')])
        };
        const branchState = mapToObject(context.branches, x => [x.prop('name'), this.visit(x, leafState)]);

        return {
            ...branchState,
            _validations: leafState,
        }
    }
}
