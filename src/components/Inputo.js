import React, { Component } from 'react';
import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import ValidationStateVisitor from './visitors/ValidationStateVisitor';
import ValidationMessageVisitor from './visitors/ValidationMessageVisitor';

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
            const stateVisitor = new ValidationStateVisitor();
            const messageVisitor = new ValidationMessageVisitor();

            stateVisitor.traverse(inputo.context.formo);
            messageVisitor.traverse(inputo.context.formo, stateVisitor.validationState);

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

    // componentDidUpdate() {
    //     this.context.formo.changed();
    // }

    render() {
        return <input placeholder={this.props.name} value={this.state.value} type="text" onChange={e => this.onChange(e)} />
    }
}

Inputo.contextTypes = {
    formo: React.PropTypes.objectOf((propValue, key, componentName, location, propFullName) => {
        return true;
    })
}

export default Inputo;