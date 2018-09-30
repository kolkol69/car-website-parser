import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './style.css'

export default class CarPage extends Component {

    render() {
        const carAPI = this.props.carAPI;
        const car = carAPI[this.props.number];

        if (!car) {
            return (
                <div>
                    Sorry, the given car number was not found
            </div>
            )
        }

        return (
            <div className='row car-page-body'>
                <div className='col-md-12'>
                    <p className='h2'>{car.title}</p>
                </div>
                <div id="myCarousel" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                        <li data-target="#myCarousel" data-slide-to="1"></li>
                        <li data-target="#myCarousel" data-slide-to="2"></li>
                    </ol>

                    <div className="carousel-inner">
                        <div className="item active">
                            <img src='http://img1.rstcars.com/oldcars/audi/a5/big/8035220-11.jpg' alt="Los Angeles" />
                        </div>

                        <div className="item">
                            <img src='http://img1.rstcars.com/oldcars/audi/a5/big/8035220-11.jpg' alt="Chicago" />
                        </div>

                        <div className="item">
                            <img src='http://img1.rstcars.com/oldcars/audi/a5/big/8035220-11.jpg' alt="New York" />
                        </div>

                        <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                            <span className="glyphicon glyphicon-chevron-left"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="right carousel-control" href="#myCarousel" data-slide="next">
                            <span className="glyphicon glyphicon-chevron-right"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>

                </div>

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
                                <td>Last Update date:</td>
                                <td className='td-about'>{car.updateDate}</td>
                            </tr>
                        </tbody>
                    </table>
                    <Link className="back-link" to='/cars'>Back to Car List</Link>
                </div>
            </div>
        )
    }
}