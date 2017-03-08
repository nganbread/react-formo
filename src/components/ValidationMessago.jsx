import React, { Component } from 'react';
import CONSTANTS from 'configuration/constants';

class ValidationMessago extends Component {

    componentWillMount() {
        this.context.formo.leaf(CONSTANTS.LEAF.VALIDATION_MESSAGO, this);
    }

    componentWillUnmount() {
        this.context.formo.deleaf(CONSTANTS.LEAF.VALIDATION_MESSAGO, this);
    }

    render() {
        return this.state && this.state.invalid
            ? <div>{this.props.children}</div>
            : null;
    }
}

ValidationMessago.contextTypes = {
    formo: React.PropTypes.objectOf((propValue, key, componentName, location, propFullName) => {
        return true;
    })
}

export default ValidationMessago;