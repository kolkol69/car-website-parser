import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import ListGroup from 'react-bootstrap/lib/ListGroup'
// import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import { ListGroup, ListGroupItem, Image } from 'react-bootstrap'
// import './carlist.css'

export default class CarsList extends Component {
  render() {
    const carAPI = this.props.carAPI;
    return (
      <ListGroup>
        {
          carAPI.map(car => (
            <ListGroupItem
              key={car.id}
              header={<Link className='header-link' to={`/cars/${car.number}`}>{car.title}</Link>}
            >
              <Link to={`/cars/${car.number}`}><Image src={car.img}  /></Link>
              <div className="car-short-description">
                Price: {car.price}
                Year: {car.year}
              </div>
            </ListGroupItem>
          ))
        }
      </ListGroup>
    )
    // return (
    //   <div>
    //     <ol>
    //       {
    //         carAPI.map(car => (
    //           <li key={car.id}>
    //             <Link to={`/cars/${car.number}`}>
    //             <h3>{car.title}</h3> 
    //             Price: {car.price}   
    //             Year: {car.year}
    //             </Link>
    //           </li>
    //         ))
    //       }
    //     </ol>
    //   </div>
    // )
  }
}