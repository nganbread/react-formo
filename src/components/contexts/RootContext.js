import BranchContext from './BranchContext';

class RootContext extends BranchContext {
    constructor() {
        super(null, null)
    }

    setState(){

    }
}

const rootContext = new RootContext();
export {
    rootContext
}