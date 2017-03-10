import React, { Component } from 'react';
import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import ValidationRuleVisitor from 'visitors/ValidationRuleVisitor';
import ValidationInputVisitor from 'visitors/ValidationInputVisitor';
import ValidationStateVisitor from 'visitors/ValidationStateVisitor';
import ValidationMessageVisitor from 'visitors/ValidationMessageVisitor';
import ValidationFormVisitor from 'visitors/ValidationFormVisitor';
import SetStateAncestorsVisitor from 'visitors/SetStateAncestorsVisitor';
import CONSTANTS from 'configuration/constants';

class Inputo extends Component {
    constructor() {
        super();
        this.state = {
            value: 'X'
        }
    }

    onChange(event) {
        const inputo = this;
        const wasClean = this.state && !this.state.dirty;

        this.setState({
            value: event.target.value,
        }, () => {
            const node = this._node();

            const ruleVisitor = new ValidationRuleVisitor();
            const stateVisitor = new ValidationStateVisitor();
            const inputVisitor = new ValidationInputVisitor();
            const formVisitor = new ValidationFormVisitor();
            const messageVisitor = new ValidationMessageVisitor();

            ruleVisitor.traverse(node);
            stateVisitor.traverse(node, ruleVisitor.validationRules);
            inputVisitor.traverse(node, stateVisitor.validationState);
            formVisitor.traverse(node, stateVisitor.validationState);
            messageVisitor.traverse(node, stateVisitor.validationState);

            if (wasClean) {
                const dirtyFormVisitor = new SetStateAncestorsVisitor({dirty: true});
                dirtyFormVisitor.traverse(node);
            }
        });
    }

    _node(){
        return this.context.formo.leaf(CONSTANTS.LEAF.INPUTO, this);
    }

    _nodeParent(){
        return this.context.formo;
    }

    onFocus() {
        if (this.state && !this.state.touched) {
            const dirtyFormVisitor = new SetStateAncestorsVisitor({touched: true});
            dirtyFormVisitor.traverse(this.context.formo.leaf(CONSTANTS.LEAF.INPUTO, this));
        }
    }

    componentWillMount() {
        this.context.formo.leaf(CONSTANTS.LEAF.INPUTO, this);
    }

    componentWillUnmount() {
        this.context.formo.deleaf(CONSTANTS.LEAF.INPUTO, this);
    }

    getValue() {
        return this.state.value;
    }

    style() {
        return {
            border: this.state.invalid ? '1px solid red' : '',
            backgroundColor: this.state.dirty ? 'beige' : '',
            color: this.state.touched ? 'blue' : '',
            margin: 2
        }
    }

    render() {
        return <input style={this.style()}
            placeholder={this.props.name}
            value={this.state.value}
            type="text"
            onFocus={e => this.onFocus(e)}
            onChange={e => this.onChange(e)}
            disabled={this.state.disabled}
        />
    }
}

Inputo.contextTypes = {
    formo: React.PropTypes.objectOf((propValue, key, componentName, location, propFullName) => {
        return true;
    })
}

export default Inputo;