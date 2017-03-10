import { rootContext } from 'contexts/RootContext';

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
        })

        this._visit(context.parent);
    }
}