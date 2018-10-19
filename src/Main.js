import React from 'react';
import Home from './Home/Home';
import CarsRoute from './CarsRoute';
import { Route, Switch } from 'react-router-dom';

const Main = () => {
    return (
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/cars' component={CarsRoute}/>
        </Switch>
    );
};

export default Main;
