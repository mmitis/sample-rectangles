import React from 'react';

import InputForm from './InputForm';
import RectangleBlock from './RectangleBlock';

const RECTANGLES_LIMIT = 5;
const LOCAL_STORAGE_KEY = 'rectangles_saved_config';

import './App.scss';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rectangles: this.loadRectanglesFromStorage()
        };

        // Binds
        this.formValidate = this.formValidate.bind(this);
        this.addRectangle = this.addRectangle.bind(this);
        this.removeRectangle = this.removeRectangle.bind(this);
    }

    /**
     * Form validation function. Returns false if everything is ok, or return string with the error is occures.
     * @returns {boolean|string} result of the validation
     */
    formValidate(formData) {
        // Values cannot be negative?
        const noNegatives = ['posX', 'posY', 'width', 'height'].every((property) => !isNaN(formData[property]) && formData[property] >= 0);
        if (!noNegatives) {
            return `There cannot be negative values in the form`;
        }

        // Rectangles limit
        if (this.state.rectangles.length + 1 > RECTANGLES_LIMIT) {
            return `Cannot add more rectangles (maximum is ${RECTANGLES_LIMIT})`;
        }

        // Viewport width cannot be lower than the sum of the rectangle width
        const sumWidth = this.getSumAllRectanglesWidth() + formData.width;
        const viewportWidth = this.getViewportWidth();
        if (viewportWidth < sumWidth) {
            return `Sum of all widths cannot be bigger than the viewport width of the screen ( ${sumWidth} < ${viewportWidth} )`
        }

        //Form is valid
        return false;
    }

    /**
     * Gets the sum of the width of the all rectangles in the store
     * @returns {number}
     */
    getSumAllRectanglesWidth() {
        return this.state.rectangles.reduce((acc, rectangle) => (rectangle.width + acc), 0);
    }

    getViewportWidth(){
        return Math.max(parseInt(document.documentElement.clientWidth || 0, 10), window.innerWidth);
    }

    /**
     * Adds new rectangle into the store
     * @param {{posX: number, posY: number, width:number, height: number}}rectangleDims - dimensions of the added rectangle
     */
    addRectangle(rectangleDims) {
        rectangleDims.id = Math.random().toString(36).substr(0, 5);
        this.setState({
            rectangles: [...this.state.rectangles, rectangleDims]
        }, () => {
            this.saveRectanglesInStorage();
        })
    }

    /**
     * Remove the rectangle with the given ID
     * @param {number} id - id of the rectangle to remove
     */
    removeRectangle(id) {
        this.setState({
            rectangles: this.state.rectangles.filter((rectangle) => rectangle.id !== id)
        }, () => {
            this.saveRectanglesInStorage();
        })
    }

    /**
     * Loads data from the local storage
     * @returns {Array} array with data about rectangles
     */
    loadRectanglesFromStorage() {
        try {
            return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
        } catch (e) {
            console.info('Invalid data loaded from the local storage');
            return [];
        }
    }

    /**
     * Save rectangles in storage
     */
    saveRectanglesInStorage() {
        const dataToSave = JSON.stringify(this.state.rectangles);
        return localStorage.setItem(LOCAL_STORAGE_KEY, dataToSave);
    }

    render() {
        return (<div>
            <InputForm
                onFormSubmit={this.addRectangle}
                validateForm={this.formValidate}
            />
            <div className="canva">
                {this.state.rectangles.map((rectangle) => {
                    return <RectangleBlock key={rectangle.id}
                                           id={rectangle.id}
                                           posX={rectangle.posX}
                                           posY={rectangle.posY}
                                           width={rectangle.width}
                                           height={rectangle.height}
                                           // yea i know it could be just replaced by one prop 'rectangle' with all data :)
                                           onRemoveClick={this.removeRectangle}
                    />
                })}
            </div>

        </div>)


    }
}

export default App;