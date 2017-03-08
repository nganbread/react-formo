import { rootContext } from 'contexts/RootContext';
import some from 'lodash/some';
import CONSTANTS from 'configuration/constants';

export default class {
    constructor(property) {
        this._property = property;
    }
    traverse(context) {
        if (context === rootContext) return;

        //clean everything below us
        this._visitChildren(context);
        //update the parents if they should not be clean
        this._visitParent(context, this);
    }

    //pass the clean child up. We cant trust the react state as it may not have been updated yet
    _visitParent(context, cleanChild) {
        if (context === rootContext) return;
        if (context._component.state && !context._component.state[this._property]) return;

        let hasDirtyChild = some(context.branches, branch => {
            if (branch === cleanChild) return false;
            return branch._component.state.dirty;
        });

        hasDirtyChild = hasDirtyChild || some(context.getLeaves(CONSTANTS.LEAF.INPUTO), leaf => leaf._component.state[this._property])

        if (hasDirtyChild) {
            context.setState({
                [this._property]: true
            });
        }

        this._visitParent(context.parent, this);
    }

    _visitChildren(context) {
        //update the state and the component
        context.setState({
            [this._property]: false
        });

        context.getLeaves(CONSTANTS.LEAF.INPUTO).forEach(leaf => leaf.setState({
            [this._property]: false
        }));

        context.branches.forEach(branch => this._visitChildren(branch));
    }
}