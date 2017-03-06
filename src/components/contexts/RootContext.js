import BranchContext from './BranchContext';

const fakeComponent = {
    props: { name: '_root' }
};

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