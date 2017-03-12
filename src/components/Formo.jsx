import React, { Component } from 'react';
import BranchContext from 'contexts/BranchContext';
import { rootContext } from 'contexts/RootContext';
import SetStateChildrenVisitor from 'visitors/SetStateChildrenVisitor';
import ValueVisitor from 'visitors/ValueVisitor';
import CONSTANTS from 'configuration/constants';

class Formo extends Component {

    submit() {
        if (!this.props.onSubmit) throw 'onSubmit prop is required to submit a form';

        const visitor = new ValueVisitor();
        visitor.traverse(this._node());

        this.props.onSubmit(visitor.value);
    }

    getChildContext() {
        return {
            formo: this._node()
        };
    }

    clean() {
        const cleanFormVisitor = new SetStateChildrenVisitor({
            [CONSTANTS.STATE.DIRTY]: false
        });
        cleanFormVisitor.traverse(this._node());
    }

    untouch() {
        const cleanFormVisitor = new SetStateChildrenVisitor({
            [CONSTANTS.STATE.TOUCHED]: false
        });
        cleanFormVisitor.traverse(this._node());
    }

    disable(disable) {
        const cleanFormVisitor = new SetStateChildrenVisitor({
            [CONSTANTS.STATE.DISABLED]: disable
        });
        cleanFormVisitor.traverse(this._node());
    }

    _node() {
        return this._nodeParent().branch(this);
    }

    _nodeParent() {
        return this.context.formo || rootContext;
    }

    style() {
        return {
            border: this.state && this.state[CONSTANTS.STATE.INVALID] ?
                '1px solid red' : '',
            backgroundColor: this.state && this.state[CONSTANTS.STATE.DIRTY] ?
                'beige' : 'white',
            color: this.state && this.state[CONSTANTS.STATE.TOUCHED] ?
                'blue' : 'black',
            padding: 5,
            margin: 5
        }
    }

    componentWillUnmount() {
        this._nodeParent().prune(this);
    }

    render() {
        return <div style={this.style()}>
            <button onClick={() => this.clean()}>Clean</button>
            <button onClick={() => this.untouch()}>Untouch</button>
            <button onClick={() => this.disable(true)}>Disable</button>
            <button onClick={() => this.disable(false)}>Enable</button>
            {this.props.name}
            {this.props.children}
        </div >
    }
}

Formo.contextTypes = {
    formo: React.PropTypes.objectOf((propValue, key, componentName, location, propFullName) => {
        return true;
    })
}

Formo.childContextTypes = {
    formo: React.PropTypes.objectOf((propValue, key, componentName, location, propFullName) => {
        return true;
    })
}

export default Formo;