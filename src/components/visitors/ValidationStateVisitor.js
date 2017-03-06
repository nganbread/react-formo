import ValidationRuleVisitor from './ValidationRuleVisitor';
import { mapToObject, keys } from './../../utils/utils';
import { rootContext } from './../contexts/RootContext';
import every from 'lodash/every';

export default class {
    traverse(context, validationRules) {
        //go to the root
        let root = context;
        while (root.parent !== rootContext) {
            root = root.parent;
        }

        //breadth first
        this.validationState = this.visit(root, validationRules);
    }

    visit(context, validationRules) {
        const leaves = context.getLeaves('VALIDATABLE');

        const leafState = mapToObject(leaves, x => [x.prop('name'), this.validate(x, validationRules)])
        const branchState = mapToObject(context.branches, x => [x.prop('name'), this.visit(x, validationRules[x.prop('name')])]);

        const validationState = {
            ...leafState,
            ...branchState,
            _valid: every({ ...leafState, ...branchState }, '_valid')
        };
        return validationState;
    }

    validate(component, validationRules) {
        const value = component._component.getValue();
        const ruleKeys = keys(component.prop('validations'));
        const validations = mapToObject(ruleKeys, x => {
            const rule = validationRules['_validations'][ruleKeys];
            const valid = !rule || rule(value);

            return [x, valid];
        });

        return {
            _valid: every(validations),
            _validations: validations
        }
    }
}
