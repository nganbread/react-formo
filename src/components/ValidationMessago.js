import React, { Component } from 'react';

class ValidationMessago extends Component {

    componentWillMount() {
        this.context.formo.leaf('VALIDATION_MESSAGE', this);
    }

    componentWillUnmount() {
        this.context.formo.deleaf('VALIDATION_MESSAGE', this);
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