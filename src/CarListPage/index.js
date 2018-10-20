import React, { Component } from 'react';
import CarsFilteredList from './CarsFilteredList';

export default class CarListPage extends Component {
    state = {
        carAPI: []
    }
    componentDidMount() {
        fetch('http://localhost:3000/cars_data')
            .then(response => response.json())
            .then(data => this.setState({ carAPI: data }));
    }
    render() {
        return (
            <div>
                <CarsFilteredList carAPI={this.state.carAPI} {...this.props} />
            </div>
        );
    }
}
