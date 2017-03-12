import React from 'react';
import CONSTANTS from 'configuration/constants';
import LeafComponent from './LeafComponent';

export default class extends LeafComponent {
    constructor(){
        super(CONSTANTS.LEAF.SUBMITO);
    }
    
    submit = () => {
        this.context.formo._component.submit();
    }

    render() {
        return <div onClick={this.submit}>
            {this.props.children}
        </div >
    }
};