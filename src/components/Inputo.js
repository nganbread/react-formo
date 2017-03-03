import React, { Component } from 'react';
import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import ValidationRuleVisitor from './visitors/ValidationRuleVisitor';
import ValidationInputVisitor from './visitors/ValidationInputVisitor';
import ValidationStateVisitor from './visitors/ValidationStateVisitor';
import ValidationMessageVisitor from './visitors/ValidationMessageVisitor';
import ValidationFormVisitor from './visitors/ValidationFormVisitor';

class Inputo extends Component {
    constructor() {
        super();
        this.state = {
            value: 'X'
        }
    }

    onChange(event) {
        const inputo = this;

        this.setState({
            value: event.target.value
        }, () => {
            const ruleVisitor = new ValidationRuleVisitor();
            const stateVisitor = new ValidationStateVisitor();
            const inputVisitor = new ValidationInputVisitor();
            const formVisitor = new ValidationFormVisitor();
            const messageVisitor = new ValidationMessageVisitor();

            ruleVisitor.traverse(inputo.context.formo);
            stateVisitor.traverse(inputo.context.formo, ruleVisitor.validationRules);
            inputVisitor.traverse(inputo.context.formo, stateVisitor.validationState);
            formVisitor.traverse(inputo.context.formo, stateVisitor.validationState);
            messageVisitor.traverse(inputo.context.formo, stateVisitor.validationState);

            console.log(ruleVisitor.validationRules)
            console.log(stateVisitor.validationState);
        });
    }

    componentWillMount() {
        this.context.formo.leaf('VALIDATABLE', this);
    }

    componentWillUnmount() {
        this.context.formo.deleaf('VALIDATABLE', this);
    }
    
    getValue(){
        return this.state.value;
    }

    render() {
        return <input style={{border: this.state.invalid ? '1px solid red' : '', margin: 2}} placeholder={this.props.name} value={this.state.value} type="text" onChange={e => this.onChange(e)} />
    }
}

Inputo.contextTypes = {
    formo: React.PropTypes.objectOf((propValue, key, componentName, location, propFullName) => {
        return true;
    })
}

export default Inputo;