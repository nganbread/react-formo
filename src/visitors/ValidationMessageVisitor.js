import { pathProperty } from 'utils/utils';
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
        context.getLeaves(CONSTANTS.LEAF.VALIDATION_MESSAGO).forEach(validationMessage =>{
            validationMessage.setState({
                invalid: !pathProperty(validationState, validationMessage.prop(CONSTANTS.PROP.FOR))[CONSTANTS.STATE.VALIDATIONS][validationMessage.prop(CONSTANTS.PROP.RULE)]
            });
        });

        context.branches.forEach(branch =>{
            this.visit(branch, validationState[branch.prop(CONSTANTS.PROP.NAME)])
        });
    }
}
