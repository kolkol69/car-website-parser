import React from 'react';
import PropTypes from 'prop-types';
import CarDetails from './CarDetails';
import ImageCarousel from './ImageCarousel';
import { Link } from 'react-router-dom';
import { css } from 'react-emotion';
import { ClipLoader } from 'react-spinners';
import './style.css';

const override = css`
    display: block;
    position: absolute;
    top: 30%;
    left: 45%;
    `;
class CarPage extends React.Component {

    state = {
        carAPI: [],
        loading: true
    }

    componentDidMount() {
        const { type, model } = getAllUrlParams();
        fetch(`http://localhost:3000/cars_data/${this.props.id}?type=${type}&model=${model}`)
            .then(response => response.json())
            .then(data => this.setState({ carAPI: data, loading: false }));
    }

    render() {
        const props = this.props;
        if (this.state.loading) {
            return (
                <div className='sweet-loading'>
                    <ClipLoader
                        className={override}
                        sizeUnit={"px"}
                        size={100}
                        color={'#00cccc'}
                        loading={this.state.loading}
                    />
                </div>
            );
        }
        return (
            <div>
                <ImageCarousel carAPI={this.state.carAPI} {...props} />
                <CarDetails carAPI={this.state.carAPI} {...props} />
                <Link className="back-link" to='/cars'>Back to Car List</Link>
            </div>
        );
    }
}

const getAllUrlParams = () => {
    let queryString = window.location.search.slice(1);

    const paramsObj = {};

    if (queryString) {

        let arr = queryString.split('&');

        for (let i = 0; i < arr.length; i++) {
            let a = arr[i].split('=');

            let paramNum = undefined;
            let paramName = a[0].replace(/\[\d*\]/, function (v) {
                paramNum = v.slice(1, -1);
                return '';
            });

            let paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

            if (paramsObj[paramName]) {
                if (typeof paramsObj[paramName] === 'string') {
                    paramsObj[paramName] = [paramsObj[paramName]];
                }
                if (typeof paramNum === 'undefined') {
                    paramsObj[paramName].push(paramValue);
                }
                else {
                    paramsObj[paramName][paramNum] = paramValue;
                }
            }
            else {
                paramsObj[paramName] = paramValue;
            }
        }
    }

    return paramsObj;
};

CarPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default CarPage;

