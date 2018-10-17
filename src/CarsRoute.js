import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import CarListPage from './CarListPage';
import CarPage from './CarPage';

export default class CarsRoute extends Component {
  state = {
    carAPI: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/carsroute')
      .then(response => response.json())
      .then(data => this.setState({ carAPI: data }))
  }

  render() {
    return (
      <Switch>
        <Route exact path="/cars" render={props => <CarListPage carAPI={this.state.carAPI} {...props.match.params} />} />
        <Route path="/cars/:number" render={props => <CarPage carAPI={this.state.carAPI} {...props.match.params}/>} />
      </Switch>
    )
  }
}
