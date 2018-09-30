import React from 'react'
import CarDetails from './CarDetails'
import ImageCarousel from './ImageCarousel'
import { Link } from 'react-router-dom'
import './style.css'

const CarPage = (props) => {

    if (!props.carAPI[props.number]) {
        return (
            <div>
                Sorry, the given car number was not found
            </div>
        )
    }

    return (
        <div>
            <ImageCarousel {...props} />
            <CarDetails {...props} />
            <Link className="back-link" to='/cars'>Back to Car List</Link>
        </div>
    )
}
export default CarPage

