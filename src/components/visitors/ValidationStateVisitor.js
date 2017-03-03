import ValidationRuleVisitor from './ValidationRuleVisitor';
import { mapToObject, keys } from './../../utils/utils';

export default class {
    traverse(context) {
        //go to the root
        let root = context;
        while(root.parent){
            root = root.parent;
        }

        //breadth first
        this.validationState = this.visit(root);
    }

    visit(context) {
        const ruleVisitor = new ValidationRuleVisitor();
        ruleVisitor.traverse(context);

        const rules = ruleVisitor.rules;
        const leaves = context.getLeaves('VALIDATABLE');

        const leafState = mapToObject(leaves, x => [x.props.name, this.validate(x, rules)])
        const branchState = mapToObject(context.branches, x => [x.name(), this.visit(x)]);

        return {
            ...leafState,
            ...branchState
        }
    }

    validate(component, rules) {
        const value = component.getValue();
        const ruleKeys = keys(component.props.validations);

        return {
            _validations: mapToObject(ruleKeys, x => {
                const rule = rules[ruleKeys];
                const valid = !rule || rule(value);

                return [x, valid];
            })
        }
    }
}
