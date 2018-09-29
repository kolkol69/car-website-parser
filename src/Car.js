import React from 'react'
import {Link} from 'react-router-dom'
import {carAPI} from './output/carsdb.js'

const Car = (props) => {
    
    // const carNumber = parseInt(props.match.params.number, 10);
    const car = carAPI[props.match.params.number];
    console.log('\n================================');
    console.log('\ncarNumber:', props.match.params.number);
    console.log('\ncar:', car);
    console.log('\n================================');

    if(!car){
        return(
            <div>
                Sorry, the given car number was not found
            </div>
        )
    } 
    return (
        <div>
            <h1>{car.title}</h1>
            <h2>{car.price}</h2>
            <br/>
            <h3>{car.year}</h3>
            <h3>{car.location}</h3>
            <Link to='/cars'>Back</Link>
        </div>
    )
}

export default Car
