import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CarList from '../CarsList';
import { FormGroup, FormControl } from 'react-bootstrap';

export default class CarsFilteredList extends Component {
  state = {
      filteredArray: []
    };

  filterList = (event) => {
    let filteredArray = this.props.carAPI;
    let searchValue = event.target.value.toLowerCase();
    filteredArray = filteredArray.filter(item => item.title.toLowerCase().search(searchValue) !== -1);
    this.setState({ filteredArray });
  }

  getCarUrl = (filteredArr, number) => {
    const trimedUrl = filteredArr[number].link.split('.')[1].split('/');
    return `/cars/${number}?type=${trimedUrl[3]}&model=${trimedUrl[4]}`;
  };  

  render() {
    return (
      <div>
        <form>
          <FormGroup>
            <FormControl onChange={this.filterList} type="text" placeholder="Search" />
          </FormGroup>
        </form>
        <CarList getCarUrl = {this.getCarUrl} filteredArray={this.state.filteredArray.length ? this.state.filteredArray : this.props.carAPI} {...this.props} />
      </div>
    );
  }
}

CarsFilteredList.propTypes = {
  carAPI: PropTypes.array.isRequired
};
