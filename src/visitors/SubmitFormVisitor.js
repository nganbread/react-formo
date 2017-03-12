import { rootContext } from 'contexts/RootContext';
import { resolveString } from 'utils/utils';

export default class {
    traverse(leafContext) {
        const formName = resolveString(leafContext.prop('formo'));
        this._visit(leafContext.parent, formName);
    }

    _submit(context) {
        context._component.submit();
    }

    _visit(context, formName) {
        if (context === rootContext) return;
        if (!formName) return this._submit(context);
        if (formName === context.prop('name')) return this._submit(context);

        this._visit(context.parent, formName);
    }
}