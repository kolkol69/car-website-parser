import React, { Component } from 'react';
import CarsFilteredList from './CarsFilteredList';

export default class CarListPage extends Component {
    render() {
        return (
            <div>
                <CarsFilteredList {...this.props}/>
            </div>
        );
    }
}
