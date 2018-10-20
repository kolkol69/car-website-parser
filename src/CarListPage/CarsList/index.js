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
        carAPI.map((car, i) => (
          <ListGroupItem
            key={car.id}
            className='col-md-6 col-xs-12'
          >
            <Link className='col-md-1 col-xs-6' to={`${getCarUrl(props, car.number)}`}>
              <Image className='img-icon' src={car.img[0]} />
            </Link>
            <Link className='title-link col-md-6 col-xs-6 col-md-offset-5' to={`${getCarUrl(props, car.number)}`}>
              <h4>{car.title}</h4>
            </Link>
            <span className='col-md-6 col-xs-6 col-md-offset-5'>
              Price: {car.price}
              <br />
              Year: {car.year}
            </span>
          </ListGroupItem>
        ))
      }
    </ListGroup>
  );
};

const getCarUrl = (props, number) => {
  const trimedUrl = props.filteredArray[number].link.split('.')[1].split('/');
  // return `/cars/${number}`;
  return `/cars/${number}?type=${trimedUrl[3]}&model=${trimedUrl[4]}`;
};  

CarsList.propTypes = {
  filteredArray : PropTypes.array.isRequired
};

export default CarsList;