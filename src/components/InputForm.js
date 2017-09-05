import React from "react";
import PropTypes from 'prop-types';

import './InputForm.scss';

class InputForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posX:   0,
            posY:   0,
            width:  0,
            height: 0,
            error:  ''
        };

        // Binds
        this.submitForm = this.submitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * Event fired on every change in form
     * @param event
     */
    handleChange(event) {
        const target = event.target;
        this.setState({
            [target.name]: parseInt(target.value, 10)
        });
    }

    /**
     * Fired on the submit of the form
     */
    submitForm() {
        const validateResult = this.props.validateForm(this.state);
        if (!validateResult) {
            this.props.onFormSubmit(this.state);
            this.setState({
                error: ''
            })
        } else {
            this.setState({
                error: validateResult
            })
        }
    }

    render() {
        return (
            <div className="input-form">
                <div className="input-form-group">
                    <label>Position X</label>
                    <input type="number" name="posX" onChange={this.handleChange} defaultValue={this.state.posX}/>
                </div>
                <div className="input-form-group">
                    <label>Position Y</label>
                    <input type="number" name="posY" onChange={this.handleChange} defaultValue={this.state.posY}/>
                </div>
                <div className="input-form-group">
                    <label>Width</label>
                    <input type="number" name="width" onChange={this.handleChange} defaultValue={this.state.width}/>
                </div>
                <div className="input-form-group">
                    <label>Height</label>
                    <input type="number" name="height" onChange={this.handleChange} defaultValue={this.state.height}/>
                </div>
                <div className="input-form-feedback">{this.state.error}</div>
                <input type="submit" className="input-form-submit" value="Add Rectangle!" onClick={this.submitForm}/>
            </div>

        );
    }
}

const {func} = PropTypes;

InputForm.defaults = {
    validateForm: () => true,
    onFormSubmit: () => true
};

InputForm.propTypes = {
    validateForm: func,
    onFormSubmit: func
};

export default InputForm;

