import React, { Component } from 'react';
import CONSTANTS from 'configuration/constants'

class ValidationRulo extends Component {
    componentWillMount(){
        this.context.formo.leaf(CONSTANTS.LEAF.VALIDATION_RULO, this);
    }

    componentWillUnmount(){
        this.context.formo.deleaf(CONSTANTS.LEAF.VALIDATION_RULO, this);
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