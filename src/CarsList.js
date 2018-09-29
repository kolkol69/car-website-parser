import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class CarsList extends Component {

  render() {
    const carAPI = this.props.carAPI;
    return (
      <div>
        <ol>
          {
            carAPI.map(car => (
              <li key={car.id}>
                <Link to={`/cars/${car.number}`}>{car.title}</Link>
              </li>
            ))
          }
        </ol>
      </div>
    )
  }
}