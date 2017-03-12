import React from 'react';
import CONSTANTS from 'configuration/constants'
import LeafComponent from './LeafComponent';

export default class extends LeafComponent {
    constructor(){
        super(CONSTANTS.LEAF.VALIDATION_RULO)
    }

    render(){
        return null;
    }

    shouldComponentUpdate(){
        //We never render any children, so we dont ever have to update
        return false;
    }
}