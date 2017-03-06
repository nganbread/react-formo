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
        context.getLeaves('VALIDATABLE').forEach(validatable =>{
            validatable.setState({
                invalid: !validationState[validatable.prop('name')]['_valid']
            });
        });

        context.branches.forEach(branch =>{
            this.visit(branch, validationState[branch.prop('name')])
        });
    }
}
