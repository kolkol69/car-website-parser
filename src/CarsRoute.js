import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import CarsList from './CarsList'
import Car from './Car'

export default class CarsRoute extends Component {
  state = {
    carAPI: [],
  }

  componentDidMount() {
    fetch('http://localhost:3003/cars')
      .then(response => response.json())
      .then(data => this.setState({ carAPI: data }))
  }
  render() {
    return (
      <Switch>
        <Route exact path="/cars" render={props => <CarsList carAPI={this.state.carAPI} {...props.match.params} />} />
        <Route path="/cars/:number" render={props => <Car carAPI={this.state.carAPI} {...props.match.params}/>} />
      </Switch>
    )
  }
}
