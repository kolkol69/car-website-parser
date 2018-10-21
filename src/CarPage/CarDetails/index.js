import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CarDetails extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        carAPI: PropTypes.object.isRequired
    }

    render() {
        const car = this.props.carAPI;
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
                            <td>Engine:</td>
                            <td className='td-about'>{car.engine}</td>
                        </tr>
                        <tr>
                            <td>Transmission Type:</td>
                            <td className='td-about'>{car.transmissionType}</td>
                        </tr>
                        <tr>
                            <td>Car Body:</td>
                            <td className='td-about'>{car.bodyType}</td>
                        </tr>
                        <tr>
                            <td>Location:</td>
                            <td className='td-about'>{car.location}</td>
                        </tr>
                        <tr>
                            <td>Views:</td>
                            <td className='td-about'>{car.views}</td>
                        </tr>
                        <tr>
                            <td>Last Update Date:</td>
                            <td className='td-about'>{car.updateDate}</td>
                        </tr>
                        <tr>
                            <td>Original Post:</td>
                            <td className='td-about'><a href={car.url}>Click to follow the original link</a></td>
                        </tr>
                        <tr>
                            <td>Description:</td>
                            <td className='td-about'>{car.description}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

