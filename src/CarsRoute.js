import React from 'react'
import {Switch, Route} from 'react-router-dom'
import CarsList from './CarsList'
import Car from './Car'

const CarsRoute = () => {
  return (
    <Switch>
        <Route exact path="/cars" component={CarsList}/>
        <Route path="/cars/:number" component={Car}/>
    </Switch>
  )
}

export default CarsRoute 
