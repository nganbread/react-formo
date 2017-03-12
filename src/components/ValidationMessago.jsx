import React from 'react';
import CONSTANTS from 'configuration/constants';
import LeafComponent from './LeafComponent';

export default class extends LeafComponent {

    constructor(){
        super(CONSTANTS.LEAF.VALIDATION_MESSAGO);
    }

    render() {
        return this.state && this.state.invalid
            ? <div>{this.props.children}</div>
            : null;
    }
}