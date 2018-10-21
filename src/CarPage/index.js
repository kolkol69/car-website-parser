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

const getAllUrlParams = (url) => {

    // get query string from url (optional) or window
    let queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    // we'll store the parameters here
    const obj = {};

    // if query string exists
    if (queryString) {

        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        let arr = queryString.split('&');

        for (let i = 0; i < arr.length; i++) {
            // separate the keys and the values
            let a = arr[i].split('=');

            // in case params look like: list[]=thing1&list[]=thing2
            let paramNum = undefined;
            let paramName = a[0].replace(/\[\d*\]/, function (v) {
                paramNum = v.slice(1, -1);
                return '';
            });

            // set parameter value (use 'true' if empty)
            let paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

            // if parameter name already exists
            if (obj[paramName]) {
                // convert value to array (if still string)
                if (typeof obj[paramName] === 'string') {
                    obj[paramName] = [obj[paramName]];
                }
                // if no array index number specified...
                if (typeof paramNum === 'undefined') {
                    // put the value on the end of the array
                    obj[paramName].push(paramValue);
                }
                // if array index number specified...
                else {
                    // put the value at that index number
                    obj[paramName][paramNum] = paramValue;
                }
            }
            // if param name doesn't exist yet, set it
            else {
                obj[paramName] = paramValue;
            }
        }
    }

    return obj;
};

CarPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default CarPage;

