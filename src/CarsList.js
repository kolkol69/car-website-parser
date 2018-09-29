import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import { carAPI } from './output/carsdb.js'

export default class CarsList extends Component {
  state = {
    carAPI: [],
  }
  
  componentDidMount() {
    fetch('http://localhost:3003/cars')
      .then(response => response.json())
      .then(data => this.setState({ carAPI: data }))
  }

  render() {
    const carAPI = this.state.carAPI;
    if (!carAPI) {
      return (
        <div>
          Loading...
        </div>
      )
    }
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