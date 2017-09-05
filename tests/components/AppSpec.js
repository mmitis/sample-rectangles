import chai from 'chai';
import spies  from 'chai-spies';
chai.use(spies);
const expect = chai.expect;
import React from 'react';
import {shallow} from 'enzyme';
import App from './../../src/components/App';

describe('Component: App', function () {

    global['localStorage'] = {
        getItem: chai.spy(() => '[]'),
        setItem: chai.spy()
    };

    function setup() {
        App.prototype.getViewportWidth = chai.spy(() => 1000);
        return {
            wrapper: shallow(<App />)
        };
    }

    it('should render properly component with all elements', function () {
        const {wrapper} = setup();
        wrapper.setState({
            rectangles: [{id: 'AA', posX: 10, posY: 10, width: 100, height: 100}, {
                id: 'BB',
                posX: 10,
                posY: 10,
                width: 100,
                height: 100
            }]
        });

        expect(wrapper.find('InputForm').length).to.equal(1);
        expect(wrapper.find('div.canva').length).to.equal(1);
        expect(wrapper.find('RectangleBlock').length).to.equal(2);
    });

    it('should test validate form method', function () {
        const {wrapper} = setup();
        const instance = wrapper.instance();

        let formData = {
            posX: 1,
            posY: -1,
            width: 200,
            height: 1
        };

        expect(instance.formValidate(formData)).to.be.equal('There cannot be negative values in the form');
        formData.posY = 1;
        expect(instance.formValidate(formData)).to.be.equal(false);
        wrapper.setState({
            rectangles: [
                {id: 'AA', posX: 10, posY: 10, width: 100, height: 100},
                {id: 'AA', posX: 10, posY: 10, width: 100, height: 100},
                {id: 'AA', posX: 10, posY: 10, width: 100, height: 100},
                {id: 'AA', posX: 10, posY: 10, width: 100, height: 100},
                {id: 'BB', posX: 10, posY: 10, width: 100, height: 100}
            ]
        });
        expect(instance.formValidate(formData)).to.be.equal('Cannot add more rectangles (maximum is 5)');
        wrapper.setState({
            rectangles: [
                {id: 'AA', posX: 10, posY: 10, width: 400, height: 100},
                {id: 'AA', posX: 10, posY: 10, width: 400, height: 100},
                {id: 'AA', posX: 10, posY: 10, width: 200, height: 100},
                {id: 'BB', posX: 10, posY: 10, width: 100, height: 100}
            ]
        });
        expect(instance.formValidate(formData)).to.be.equal('Sum of all widths cannot be bigger than the viewport width of the screen ( 1300 < 1000 )');
    });

    it('should test getSumAllRectanglesWidth method', function () {
        const {wrapper} = setup();
        const instance = wrapper.instance();
        wrapper.setState({
            rectangles: [
                {id: 'AA', posX: 10, posY: 10, width: 400, height: 100},
                {id: 'AA', posX: 10, posY: 10, width: 20, height: 100},
            ]
        });
        expect(instance.getSumAllRectanglesWidth()).to.equals(420);
        wrapper.setState({
            rectangles: [
                {id: 'AA', posX: 10, posY: 10, width: 200, height: 100},
                {id: 'AA', posX: 10, posY: 10, width: 20, height: 100},
            ]
        });
        expect(instance.getSumAllRectanglesWidth()).to.equals(220);
    });

    it('should test addRectangle method', function () {
        let formData = {
            posX: 1,
            posY: -1,
            width: 200,
            height: 1
        };
        const {wrapper} = setup();
        const instance = wrapper.instance();

        instance.setState({
            rectangles: []
        });
        expect(wrapper.state().rectangles.length).to.equals(0);
        instance.addRectangle(formData);
        expect(wrapper.state().rectangles.length).to.equals(1);
        expect(wrapper.state().rectangles[0].id.length).to.equals(5);
        expect(global['localStorage'].setItem).to.have.been.called();
    });

    it('should test removeRectangle method', function () {
        const {wrapper} = setup();
        const instance = wrapper.instance();
        instance.setState({
            rectangles: [{id: 'AA', posX: 10, posY: 10, width: 200, height: 100}]
        });
        expect(wrapper.state().rectangles.length).to.equals(1);
        instance.removeRectangle('BB');
        expect(wrapper.state().rectangles.length).to.equals(1);
        instance.removeRectangle('AA');
        expect(global['localStorage'].setItem).to.have.been.called();
        expect(wrapper.state().rectangles.length).to.equals(0);
    });

});