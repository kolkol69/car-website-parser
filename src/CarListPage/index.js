import React, { Component } from 'react';
import CarsFilteredList from './CarsFilteredList';
import { css } from 'react-emotion';
import { ClipLoader } from 'react-spinners';
const override = css`
    display: block;
    position: absolute;
    top: 30%;
    left: 45%;
    `;
export default class CarListPage extends Component {
    state = {
        carAPI: [],
        loading: true
    }
    componentDidMount() {
        fetch('http://localhost:3000/cars_data')
            .then(response => response.json())
            .then(data => this.setState({ carAPI: data, loading: false }));
    }
    render() {
        if (this.state.loading) {
            return (
                <div className='sweet-loading'>
                    <ClipLoader
                        className={override}
                        sizeUnit={"px"}
                        size={100}
                        color={'#00cccc'}
                        loading={this.state.loading}
                    />
                </div>
            );
        }
        return (
            <div>
                <CarsFilteredList carAPI={this.state.carAPI} {...this.props} />
            </div>
        );
    }
}
