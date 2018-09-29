import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import { carAPI } from './output/carsdb.js'

export default class Car extends Component {
    
    render() {
        const carAPI = this.props.carAPI;

        // const carNumber = parseInt(props.match.params.number, 10);
        const car = carAPI[this.props.number];
        console.log('\ncarNumber:', this.props.number);
        console.log('\ncar:', car);
        console.log('\n================================');

        if (!car) {
            return (
                <div>
                    Sorry, the given car number was not found
            </div>
            )
        }

        return (
            <div>
                <h1>{car.title}</h1>
                <h2>{car.price}</h2>
                <br />
                <h3>{car.year}</h3>
                <h3>{car.location}</h3>
                <Link to='/cars'>Back</Link>
            </div>
        )
    }
}