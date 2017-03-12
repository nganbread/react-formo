import { rootContext } from 'contexts/RootContext';
import { resolveString } from 'utils/utils';
import find from 'lodash/find';
import toPath from 'lodash/toPath';

export default class {
    _findFormContext(context, path) {
        const formName = resolveString(path);
        const formNamePath = toPath(formName);
        const parentContext = this._parentContext(context, formNamePath);
        return this._childContext(parentContext.parent, formNamePath);
    }

    _parentContext(context, path) {
        if (context === rootContext) throw 'Parent form "' + name + '" was not found';
        if (path.length === 0) return context;
        if (context.prop('name') === path[0]) return context;

        return this._parentContext(context.parent, path);
    }

    _childContext(context, path) {
        if (path.length === 0) return context;

        const branch = find(context.branches, branch => branch.prop('name') === path[0]);
        if (!branch) throw 'Form "' + path[0] + '" was not found';

        return this._childContext(branch, path.slice(1));
    }
}