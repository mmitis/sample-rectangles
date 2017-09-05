import chai from 'chai';
import spies  from 'chai-spies';
chai.use(spies);

const expect = chai.expect;
import React from 'react';
import { shallow } from 'enzyme';
import RectangleBlock from './../../src/components/RectangleBlock';

describe('Component: RectangleBlock', function () {

    let component;

    function setup(props) {
        const functions = {
            onRemoveClick: chai.spy()
        };
        return {
            wrapper: shallow(<RectangleBlock  {...props} {...functions} />),
            props,
            functions
        }
    }

    beforeEach(() => {
        component = setup({posX: 100, posY: 200, width: 100, height: 100, id: 'test'});
    });

    it('should render properly component with all elements', function () {
        const {wrapper} = component;
        expect(wrapper.find('div.rectangle-block').length).to.equal(1);
        const remove = wrapper.find('.rectangle-block-remove');
        expect(remove.length).to.equal(1);
        expect(remove.contains('[X]')).to.equal(true);
    });

    it('should handle click method onRemove', function () {
        const {wrapper, functions} = component;
        const remove = wrapper.find('.rectangle-block-remove');
        remove.simulate('click');
        expect(functions.onRemoveClick).to.have.been.called();
    });

});