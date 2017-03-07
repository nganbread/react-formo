import { rootContext } from 'contexts/RootContext';
import some from 'lodash/some';
import CONSTANTS from 'configuration/constants';

export default class {
    traverse(context) {        
        if(context === rootContext) return;

        //clean everything below us
        this._cleanChildren(context);
        //update the parents if they should not be clean
        this._cleanParent(context, this);
    }

    //pass the clean child up. We cant trust the react state as it may not have been updated yet
    _cleanParent(context, cleanChild){
        if(context === rootContext) return;
        if(context._component.state && !context._component.state.dirty) return;

        let hasDirtyChild = some(context.branches, branch => {
            if(branch === cleanChild) return false;
            return branch._component.state.dirty;
        });

        hasDirtyChild = hasDirtyChild || some(context.getLeaves('INPUTO'), '_component.state.dirty')

        if(hasDirtyChild){
            context.setState({
                dirty: true
            });
        }

        this._cleanParent(context.parent, this);
    }

    _cleanChildren(context){
        //update the state and the component
        context.setState({
            dirty: false
        });

        context.getLeaves(CONSTANTS.LEAF.INPUTO).forEach(leaf => leaf.setState({
            dirty: false
        }));

        context.branches.forEach(branch => this._cleanChildren(branch));
    }
}
