import React from 'react';
import PropTypes from 'prop-types';

const ImageCarousel = (props) => {
    const car = props.carAPI[props.number];
    return (
        <div className='row car-page-body'>
            <div className='col-md-12'>
                <p className='h2'>{car.title}</p>
            </div>
            <div id="myCarousel" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                    <li data-target="#myCarousel" data-slide-to="1"></li>
                </ol>

                <div className="carousel-inner">
                    <div className="item active">
                        <img src={car.img[0]} alt='car' />
                    </div>

                    <div className="item">
                        <img src={car.img[1]} alt='car' />
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
        </div>
    );
};

ImageCarousel.propTypes = {
    number: PropTypes.string.isRequired,
    carAPI: PropTypes.array.isRequired
};

export default ImageCarousel;
