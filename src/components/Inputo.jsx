import React from 'react';
import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import ValidationRuleVisitor from 'visitors/ValidationRuleVisitor';
import ValidationInputVisitor from 'visitors/ValidationInputVisitor';
import ValidationStateVisitor from 'visitors/ValidationStateVisitor';
import ValidationMessageVisitor from 'visitors/ValidationMessageVisitor';
import ValidationFormVisitor from 'visitors/ValidationFormVisitor';
import SetStateAncestorsVisitor from 'visitors/SetStateAncestorsVisitor';
import CONSTANTS from 'configuration/constants';
import LeafComponent from './LeafComponent';

export default class extends LeafComponent {
    constructor() {
        super(CONSTANTS.LEAF.INPUTO);
        this.state = {
            [CONSTANTS.STATE.VALUE]: 'X'
        }
    }

    onChange = event => {
        const inputo = this;
        const wasClean = this.state && !this.state.dirty;

        this.setState({
            [CONSTANTS.STATE.VALUE]: event.target.value,
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
                const dirtyFormVisitor = new SetStateAncestorsVisitor({
                    [CONSTANTS.STATE.DIRTY]: true
                });
                dirtyFormVisitor.traverse(node);
            }
        });
    }

    onFocus = () => {
        if (this.state && !this.state.touched) {
            const dirtyFormVisitor = new SetStateAncestorsVisitor({
                [CONSTANTS.STATE.TOUCHED]: true
            });
            dirtyFormVisitor.traverse(this.context.formo.leaf(CONSTANTS.LEAF.INPUTO, this));
        }
    }

    style() {
        return {
            border: this.state[CONSTANTS.STATE.INVALID] ? '1px solid red' : '',
            backgroundColor: this.state[CONSTANTS.STATE.DIRTY] ? 'beige' : '',
            color: this.state[CONSTANTS.STATE.DIRTY] ? 'blue' : '',
            margin: 2
        }
    }

    render() {
        return <input style={this.style()}
            placeholder={this.props.name}
            value={this.state[CONSTANTS.STATE.VALUE]}
            type="text"
            onFocus={this.onFocus}
            onChange={this.onChange}
            disabled={this.state[CONSTANTS.STATE.DISABLED]}
        />
    }
}