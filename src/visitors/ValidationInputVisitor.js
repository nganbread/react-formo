import { rootContext } from 'contexts/RootContext';
import CONSTANTS from 'configuration/constants';

export default class {
    traverse(context, validationState){
        //go to the root
        let root = context;
        while (root.parent !== rootContext) {
            root = root.parent;
        }

        //breadth first
        this.visit(root, validationState);
    }

    visit(context, validationState){
        context.getLeaves(CONSTANTS.LEAF.INPUTO).forEach(validatable =>{
            validatable.setState({
                [CONSTANTS.STATE.INVALID]: !validationState[validatable.prop(CONSTANTS.PROP.NAME)][CONSTANTS.FORMO_STATE.VALID]
            });
        });

        context.branches.forEach(branch =>{
            this.visit(branch, validationState[branch.prop(CONSTANTS.PROP.NAME)])
        });
    }
}
