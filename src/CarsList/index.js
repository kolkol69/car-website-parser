import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { ListGroup, ListGroupItem, Image } from 'react-bootstrap'
import './style.css'

export default class CarsList extends Component {
  render() {
    const carAPI = this.props.carAPI;
    return (
      <ListGroup className='row list-unstyled'>
        {
          carAPI.map((car,i) => (
            <ListGroupItem
              key={car.id}
              className={`${i%2==0?'col-md-6 li-background':'col-md-6'}`}
              header={<Link style={{textDecoration: 'none'}} className='header-link' to={`/cars/${car.number}`}>{car.title}</Link>}
              // header={car.title}  
              // onClick={alert('hit')}
            >
              <Link  to={`/cars/${car.number}`}><Image src={car.img}  /></Link>
              {/* <Link className='col-md-8' to={`/cars/${car.number}`}><Image src={car.img}  /></Link> */}
              <span >
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