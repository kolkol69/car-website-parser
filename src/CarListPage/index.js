import React, { Component } from 'react'
import CarsFilteredList from '../CarsFilteredList'

export default class CarListPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <CarsFilteredList {...this.props}/>
            </div>
        )
    }
}
