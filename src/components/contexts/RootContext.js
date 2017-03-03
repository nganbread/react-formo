import BranchContext from './BranchContext';

const fakeComponent = {
    props: { name: '_root' },
    setState: () => { }
};

class RootContext extends BranchContext {
    constructor() {
        super(fakeComponent, null)
    }
}

const rootContext = new RootContext();
export {
    rootContext
}