import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import CarListPage from './CarListPage';
import CarPage from './CarPage';

export default class CarsRoute extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/cars" render={props => <CarListPage {...props.match.params} />} />
        <Route path="/cars/:id" render={props => <CarPage {...props.match.params}/>} />
      </Switch>
    );
  }
}
