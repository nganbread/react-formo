import AncestorVisitor from './AncestorVisitor';

export default class extends AncestorVisitor{
    constructor(){
        super();

        this.rules = {};
    }

    visit(context){
        context.getLeaves('VALIDATION_RULE').forEach(leaf =>{
            this.rules[leaf.props.rule] = this.rules[leaf.props.rule] || leaf.props.validate;
        });
    }
}
