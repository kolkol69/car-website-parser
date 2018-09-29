import React from 'react'
import { Link } from 'react-router-dom'
import {carAPI} from './output/carsdb.js'

const CarsList = () => (
    <div>
      <ul>
        {
          carAPI.map(car => (
            <li key={car.id}>
              <Link to={`/cars/${car.number}`}>{car.title}</Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
export default CarsList
