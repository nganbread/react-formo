import React, { Component } from 'react';

class ValidationRulo extends Component {
    componentWillMount(){
        this.context.formo.leaf('VALIDATION_RULE', this);
    }

    componentWillUnmount(){
        this.context.formo.deleaf('VALIDATION_RULE', this);
    }

    // componentDidUpdate() {
    //     this.context.formo.changed();
    // }

    render(){
        return null;
    }
}


ValidationRulo.contextTypes  = {
    formo: React.PropTypes.objectOf((propValue, key, componentName, location, propFullName) => {
        return true;
    })
}

export default ValidationRulo;