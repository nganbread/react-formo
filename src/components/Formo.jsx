import React, { Component } from 'react';
import BranchContext from 'contexts/BranchContext';
import { rootContext } from 'contexts/RootContext';
import RemoveStatePropertyVisitor from 'visitors/RemoveStatePropertyVisitor';

class Formo extends Component {

    getChildContext() {
        return {
            formo: (this.context.formo || rootContext).branch(this)
        };
    }

    clean() {
        const formoContext = (this.context.formo || rootContext).branch(this);
        const cleanFormVisitor = new RemoveStatePropertyVisitor('dirty');
        cleanFormVisitor.traverse(formoContext);
    }

    untouch(){
        const formoContext = (this.context.formo || rootContext).branch(this);
        const cleanFormVisitor = new RemoveStatePropertyVisitor('touched');
        cleanFormVisitor.traverse(formoContext);
    }

    style() {
        return {
            border: this.state && this.state.invalid ?
                '1px solid red' : '',
            backgroundColor: this.state && this.state.dirty ?
                'beige' : 'white',
            color: this.state && this.state.touched ?
                'blue' : 'black',
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
            <button onClick={() => this.untouch()}>Untouch</button> 
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