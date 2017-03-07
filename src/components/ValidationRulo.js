import React, { PureComponent } from 'react';
import CONSTANTS from 'configuration/constants'

class ValidationRulo extends PureComponent {
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

    shouldComponentUpdate(){
        //We never render any children, so we dont ever have to update
        return false;
    }
}


ValidationRulo.contextTypes  = {
    formo: React.PropTypes.objectOf((propValue, key, componentName, location, propFullName) => {
        return true;
    })
}

export default ValidationRulo;