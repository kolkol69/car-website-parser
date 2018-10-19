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

  render() {
    return (
      <div>
        <form>
          <FormGroup>
            <FormControl onChange={this.filterList} type="text" placeholder="Search" />
          </FormGroup>
        </form>
        <CarList filteredArray={this.state.filteredArray.length ? this.state.filteredArray : this.props.carAPI} {...this.props} />
      </div>
    );
  }
}

CarsFilteredList.propTypes = {
  carAPI: PropTypes.array.isRequired
};
