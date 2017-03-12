import React from 'react';
import CONSTANTS from 'configuration/constants';
import LeafComponent from './LeafComponent';
import SubmitFormVisitor from 'visitors/SubmitFormVisitor';

export default class extends LeafComponent {
    constructor(){
        super(CONSTANTS.LEAF.SUBMITO);
    }
    
    _submit = e => {
        const visitor = new SubmitFormVisitor(this.props.formo);
        visitor.traverse(this._node());

        e.stopPropagation();
    }

    render() {
        return <div onClick={this._submit}>
            {this.props.children}
        </div >
    }
};