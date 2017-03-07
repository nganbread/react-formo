import { rootContext } from 'contexts/RootContext';

export default class {
    traverse(context) {
        this._dirty(context);
    }

    _dirty(context){
        if(context === rootContext) return;

        context.setState({
            dirty: true,
        });

        this._dirty(context.parent);
    }
}