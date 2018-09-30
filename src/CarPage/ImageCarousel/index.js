import React from 'react'

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
        </div>
    )
}
export default ImageCarousel
