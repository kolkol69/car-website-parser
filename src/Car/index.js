import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Car extends Component {
    
    render() {
        const carAPI = this.props.carAPI;
        const car = carAPI[this.props.number];

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