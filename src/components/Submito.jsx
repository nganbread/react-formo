import React, { Component } from 'react';
import BranchContext from 'contexts/BranchContext';
import { rootContext } from 'contexts/RootContext';
import SetStateChildrenVisitor from 'visitors/SetStateChildrenVisitor';
import ValueVisitor from 'visitors/ValueVisitor';
import CONSTANTS from 'configuration/constants';

export default class extends Component {
    submit = () => {
        this.context.formo._component.submit();
    }

    static contextTypes = {
        formo: React.PropTypes.objectOf((propValue, key, componentName, location, propFullName) => {
            return true;
        })
    }

    render() {
        return <div onClick={this.submit}>
            {this.props.children}
        </div >
    }
};