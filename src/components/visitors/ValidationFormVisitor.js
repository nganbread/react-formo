import { rootContext } from './../contexts/RootContext';
import every from 'lodash/every';

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
            invalid: !validationState['_valid']
        });

        context.branches.forEach(branch => {
            this.visit(branch, validationState[branch.prop('name')])
        });
    }
}
