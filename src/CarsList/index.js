import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ListGroup, ListGroupItem, Image } from 'react-bootstrap'
import './style.css'

export default class CarsList extends Component {
  render() {
    const carAPI = this.props.carAPI;
    return (
      <ListGroup>
        {
          carAPI.map(car => (
            <ListGroupItem
              key={car.id}
              header={<Link style={{textDecoration: 'none'}} className='header-link' to={`/cars/${car.number}`}>{car.title}</Link>}
            >
              <Link to={`/cars/${car.number}`}><Image src={car.img}  /></Link>
              <span style={{float: 'right'}}>
                Price: {car.price} <br/>
                Year: {car.year}
              </span>
            </ListGroupItem>
          ))
        }
      </ListGroup>
    )
  }
}