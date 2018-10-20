import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CarDetails extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        carAPI: PropTypes.array.isRequired
    }
    
    render() {
        const car = this.props.carAPI[this.props.id];
        return (
            <div className='col-md-12'>
                <table className="table table-hover">
                    <caption>Characteristics</caption>
                    <tbody>
                        <tr>
                            <td>Price:</td>
                            <td className='td-about'>{car.price}</td>
                        </tr>
                        <tr>
                            <td>Year:</td>
                            <td className='td-about'>{car.year}</td>
                        </tr>
                        <tr>
                            <td>Condition:</td>
                            <td className='td-about'>{car.condition}</td>
                        </tr>
                        <tr>
                            <td>Engine:</td>
                            <td className='td-about'>{car.engine}</td>
                        </tr>
                        <tr>
                            <td>TransmissionType:</td>
                            <td className='td-about'>{car.transmissionType}</td>
                        </tr>
                        <tr>
                            <td>Location:</td>
                            <td className='td-about'>{car.location}</td>
                        </tr>
                        <tr>
                            <td>Description:</td>
                            <td className='td-about'>{car.description}</td>
                        </tr>
                        <tr>
                            <td>Mileage:</td>
                            <td className='td-about'>{car.mileage}</td>
                        </tr>
                        <tr>
                            <td>Link to original post:</td>
                            <td className='td-about'><a href={car.link}>Click to follow the original link</a></td>
                        </tr>
                        <tr>
                            <td>Last Update date:</td>
                            <td className='td-about'>{car.updateDate}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

