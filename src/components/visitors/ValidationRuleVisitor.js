import { mapToObject } from './../../utils/utils';

export default class {
    traverse(context) {
        //go to the root
        let root = context;
        while(root.parent){
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
            ...mapToObject(leaves, x => [x.props.rule, x.props.validate])   
        };
        const branchState = mapToObject(context.branches, x => [x.name(), this.visit(x, leafState)]);

        return{
            ...branchState,
            _validations: leafState,
        }
    }
}
