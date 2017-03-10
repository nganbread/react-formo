import { rootContext } from 'contexts/RootContext';
import CONSTANTS from 'configuration/constants';

export default class {
    constructor(state) {
        this._state = state;
    }

    traverse(context) {
        this._visit(context);
    }

    _visit(context) {
        if (context === rootContext) return;

        context.setState({
            ...this._state
        });

        context.getLeaves(CONSTANTS.LEAF.INPUTO).forEach(leaf => leaf.setState({
            ...this._state
        }));

        context.branches.forEach(branch => this._visit(branch));
    }
}