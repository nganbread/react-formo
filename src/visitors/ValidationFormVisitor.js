import { rootContext } from 'contexts/RootContext';
import every from 'lodash/every';
import CONSTANTS from 'configuration/constants';

export default class {
    traverse(context, validationState) {
        //go to the root
        let root = context;
        while (root.parent !== rootContext) {
            root = root.parent;
        }

        this.visit(root, validationState);
    }

    visit(context, validationState) {
        context.setState({
            [CONSTANTS.STATE.INVALID]: !validationState[CONSTANTS.FORMO_STATE.VALID]
        });

        context.branches.forEach(branch => {
            this.visit(branch, validationState[branch.prop(CONSTANTS.PROP.NAME)])
        });
    }
}
