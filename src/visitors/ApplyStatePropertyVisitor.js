import { rootContext } from 'contexts/RootContext';

export default class {
    constructor(property) {
        this._property = property;
    }

    traverse(context) {
        this._visit(context);
    }

    _visit(context) {
        if (context === rootContext) return;

        context.setState({
            [this._property]: true,
        });

        this._visit(context.parent);
    }
}