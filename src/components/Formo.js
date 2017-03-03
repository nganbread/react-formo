import React, { Component } from 'react';
import BranchContext from './contexts/BranchContext';

class Formo extends Component {

    getChildContext() {
        return {
            formo: this.context.formo
                ? this.context.formo.branch(this)
                : new BranchContext(this)
        };
    }

    render() {
        return <div style={{border: '1px solid red', padding: 5, margin: 5}}>
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