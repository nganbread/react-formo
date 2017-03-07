import React, { Component } from 'react';
import BranchContext from 'contexts/BranchContext';
import { rootContext } from 'contexts/RootContext';
import CleanFormVisitor from 'visitors/CleanFormVisitor';

class Formo extends Component {

    getChildContext() {
        return {
            formo: (this.context.formo || rootContext).branch(this)
        };
    }

    clean() {
        this.setState({
            dirty: false
        }, () =>{
            const formoContext = (this.context.formo || rootContext).branch(this);
            const cleanFormVisitor = new CleanFormVisitor();
            cleanFormVisitor.traverse(formoContext);
        });
    }

    style() {
        return {
            border: this.state && this.state.invalid
                ? '1px solid red'
                : '',
            backgroundColor: this.state && this.state.dirty
                ? 'beige'
                : 'white',
            padding: 5,
            margin: 5
        }
    }

    componentWillUnmount() {
        (this.context.formo || rootContext).prune(this);
    }

    render() {
        return <div style={this.style()}>
            <button onClick={() => this.clean()}>Clean</button>
            {this.props.name}
            {this.props.children}
        </div>
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