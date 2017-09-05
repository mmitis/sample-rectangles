import chai from 'chai';
import spies  from 'chai-spies';
chai.use(spies);

const expect = chai.expect;
import React from 'react';
import { shallow } from 'enzyme';
import InputForm from './../../src/components/InputForm';

describe('Component: InputForm', function () {

    let component;

    function setup(mock, onFormSubmit = chai.spy(), validateForm = chai.spy()) {
        const props = {
            onFormSubmit, validateForm
        };

        if(mock){
            InputForm.prototype.handleChange = chai.spy();
            InputForm.prototype.submitForm = chai.spy();
        }

        return {
            wrapper: shallow(<InputForm  {...props} />),
            props
        }
    }

    it('should render properly component with all elements', function () {
        const { wrapper } = setup();
        expect(wrapper.find('div.input-form').length).to.equal(1);
        expect(wrapper.find('div.input-form-group').length).to.equal(4);
        expect(wrapper.find('input[type="number"]').length).to.equal(4);
        expect(wrapper.find('div.input-form-feedback').length).to.equal(1);
    });

    it('should test method submitForm pass validation', function () {
        const { wrapper, props } = setup();
        const instance = wrapper.instance();

        instance.submitForm();
        expect(props.validateForm).to.have.been.called();
        expect(props.onFormSubmit).to.have.been.called();
    });

    it('should test method submitForm NOT pass validation', function () {
        const { wrapper, props } = setup(false, chai.spy(), chai.spy(() => 'Error occured' ));
        const instance = wrapper.instance();

        instance.submitForm();
        expect(props.validateForm).to.have.been.called();
        expect(props.onFormSubmit).to.not.have.been.called();
        expect(wrapper.state().error).to.equals('Error occured');
    });

    it('should fire submitForm on click on submit', function () {
        const { wrapper } = setup(true);
        const submitBtn = wrapper.find('input.input-form-submit');
        submitBtn.simulate('click');
        expect(InputForm.prototype.submitForm).to.have.been.called();
    });

    it('should fire handleChange on change', function () {
        const { wrapper } = setup(true);
        const submitBtn = wrapper.find('.input-form-group input').first();
        submitBtn.simulate('change');
        expect(InputForm.prototype.handleChange).to.have.been.called();
    });

});