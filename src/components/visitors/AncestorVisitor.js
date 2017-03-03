export default class{
    traverse(context){
        if(!this.visit) throw 'Must implement visit()'
        
        this.visit(context);

        if(context.parent){
            this.traverse(context.parent);
        }
    }
}

