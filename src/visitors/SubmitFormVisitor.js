import PathFinderVisitor from './PathFinderVisitor';

export default class extends PathFinderVisitor {
    traverse(leafContext) {
        const formContext = this._findFormContext(leafContext.parent, leafContext.prop('formo'));
        formContext._component.submit();
    }
}