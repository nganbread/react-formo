import React, { Component } from 'react';
import { Formo, Inputo, ValidationMessago, ValidationRulo, Submito } from 'react-formo';

export default class extends Component {
    submit = (data) => {
        console.log(data)
    }

    render() {
        return <Formo name="form1" onSubmit={this.submit}>
            <ValidationMessago for="input1" rule="required">
                form1.input1 is required
            </ValidationMessago>

            <ValidationMessago for="form2.input2" rule="required">
                form1.form2.input2 is required
            </ValidationMessago>

            <ValidationRulo rule="required" validate={value => !!value}></ValidationRulo>

            <Inputo name="input1" validations={{ required: true }} />

            <Formo name="form2" onSubmit={this.submit}>
                <ValidationRulo rule="required" validate={value => !!value}></ValidationRulo>
                <Inputo name="input2" validations={['required']} />
                <Inputo name="input3" validations={'required'} />
                <Inputo name="input4" validations="required" />
            </Formo>

            <Formo name="form3" onSubmit={this.submit}>
                <ValidationRulo rule="required" validate={value => !!value}></ValidationRulo>
                <Inputo name="input5" validations={['required']} />
                <Inputo name="input6" validations={() => ({ required: true })} />
                <Inputo name="input7" validations={() => ['required']} />


                <Submito>
                    <button>Submit form3</button>
                </Submito>

                <Submito formo={() => 'form1'}>
                    <button>Submit () => form1</button>
                </Submito>

                <Submito formo={'form1.form2'}>
                    <button>Submit form1.form2</button>
                </Submito>

            </Formo>

        </Formo>
    }
}