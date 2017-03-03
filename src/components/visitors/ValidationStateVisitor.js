import ValidationRuleVisitor from './ValidationRuleVisitor';
import { mapToObject, keys } from './../../utils/utils';

export default class {
    traverse(context, validationRules) {
        //go to the root
        let root = context;
        while(root.parent){
            root = root.parent;
        }

        //breadth first
        this.validationState = this.visit(root, validationRules);
    }

    visit(context, validationRules) {
        const leaves = context.getLeaves('VALIDATABLE');

        const leafState = mapToObject(leaves, x => [x.props.name, this.validate(x, validationRules)])
        const branchState = mapToObject(context.branches, x => [x.name(), this.visit(x, validationRules[x.name()])]);

        return {
            ...leafState,
            ...branchState
        }
    }

    validate(component, validationRules) {
        const value = component.getValue();
        const ruleKeys = keys(component.props.validations);

        return {
            _validations: mapToObject(ruleKeys, x => {
                const rule = validationRules['_validations'][ruleKeys];
                const valid = !rule || rule(value);

                return [x, valid];
            })
        }
    }
}
