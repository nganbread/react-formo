import { pathProperty } from './../../utils/utils';
import { rootContext } from './../contexts/RootContext';

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
        context.getLeaves('VALIDATION_MESSAGE').forEach(validationMessage =>{
            validationMessage.setState({
                invalid: !pathProperty(validationState, validationMessage.prop('for'))['_validations'][validationMessage.prop('rule')]
            });
        });

        context.branches.forEach(branch =>{
            this.visit(branch, validationState[branch.prop('name')])
        });
    }
}
