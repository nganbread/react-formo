import { pathProperty } from './../../utils/utils';

export default class {
    traverse(context, validationState){
        //go to the root
        let root = context;
        while(root.parent){
            root = root.parent;
        }

        //breadth first
        this.visit(root, validationState);
    }

    visit(context, validationState){
        context.getLeaves('VALIDATION_MESSAGE').forEach(validationMessage =>{
            validationMessage.setState({
                valid: pathProperty(validationState, validationMessage.props.for)['_validations'][validationMessage.props.rule]
            });
        });

        context.branches.forEach(branch =>{
            this.visit(branch, validationState[branch.name()])
        });
    }
}
