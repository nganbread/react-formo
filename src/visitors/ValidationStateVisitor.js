import ValidationRuleVisitor from './ValidationRuleVisitor';
import { mapToObject, keys } from 'utils/utils';
import { rootContext } from 'contexts/RootContext';
import every from 'lodash/every';
import CONSTANTS from 'configuration/constants';

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
        const leaves = context.getLeaves(CONSTANTS.LEAF.INPUTO);

        const leafState = mapToObject(leaves, leaf => [leaf.prop(CONSTANTS.PROP.NAME), this.validate(leaf, validationRules)])
        const branchState = mapToObject(context.branches, branch => [branch.prop(CONSTANTS.PROP.NAME), this.visit(branch, validationRules[branch.prop(CONSTANTS.PROP.NAME)])]);

        const validationState = {
            ...leafState,
            ...branchState,
            [CONSTANTS.FORMO_STATE.VALID]: every({ ...leafState, ...branchState }, CONSTANTS.FORMO_STATE.VALID)
        };
        return validationState;
    }

    validate(component, validationRules) {
        const value = component._component.getValue();
        const ruleKeys = keys(component.prop(CONSTANTS.PROP.VALIDATIONS));
        const validations = mapToObject(ruleKeys, ruleKey => {
            const rule = validationRules[CONSTANTS.FORMO_STATE.VALIDATIONS][ruleKeys];
            const valid = !rule || rule(value);

            return [ruleKey, valid];
        });

        return {
            [CONSTANTS.FORMO_STATE.VALID]: every(validations),
            [CONSTANTS.FORMO_STATE.VALIDATIONS]: validations
        }
    }
}
