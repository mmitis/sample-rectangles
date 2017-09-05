import React from "react";
import PropTypes from 'prop-types';

import './RectangleBlock.scss';

const RectangleBlock = ({id, posX, posY, width, height, onRemoveClick}) => {
    const removeBock = function () {
        onRemoveClick(id);
    };
    return (
        <div className="rectangle-block" style={{
            top: posY,
            left: posX,
            width,
            height
        }}>
            <div className="rectangle-block-remove" onClick={removeBock}>[X]</div>
        </div>
    );
};

const {func, number, string} = PropTypes;

RectangleBlock.defaults = {
    onRemoveClick: () => true
};

RectangleBlock.propTypes = {
    posX: number.isRequired,
    posY: number.isRequired,
    width: number.isRequired,
    height: number.isRequired,
    id: string.isRequired,

    onRemoveClick: func
};

export default RectangleBlock;

