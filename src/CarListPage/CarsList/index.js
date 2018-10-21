import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem, Image } from 'react-bootstrap';
import './style.css';

const CarsList = (props) => {
  const carAPI = props.filteredArray;
  return (
    <ListGroup className='row list-unstyled'>
      {
        carAPI.map((car, i, arr) => (
          <ListGroupItem
            key={car.id}
            className='col-md-6 col-xs-12'
          >
            <Link className='col-md-1 col-xs-6' to={props.getCarUrl(arr, i)}>
              <Image className='img-icon' src={car.img} />
            </Link>
            <Link className='title-link col-md-6 col-xs-6 col-md-offset-5' to={props.getCarUrl(arr, i)}>
              <h4>{car.title}</h4>
            </Link>
            <span className='col-md-6 col-xs-6 col-md-offset-5'>
              Price: {car.price}
              <br />
              Year: {car.year}
              <br/>
              Location: {car.location}
              <br/>
              Engine: {car.engine}
              <br/>
              {car.mileage}
            </span>
          </ListGroupItem>
        ))
      }
    </ListGroup>
  );
};

CarsList.propTypes = {
  filteredArray: PropTypes.array.isRequired,
  getCarUrl: PropTypes.func.isRequired
};

export default CarsList;