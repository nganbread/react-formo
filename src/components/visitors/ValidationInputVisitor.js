import every from 'lodash/every';

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
        context.getLeaves('VALIDATABLE').forEach(validatable =>{
            validatable.setState({
                invalid: !every(validationState[validatable.props.name]['_validations'])
            });
        });

        context.branches.forEach(branch =>{
            this.visit(branch, validationState[branch.name()])
        });
    }
}
