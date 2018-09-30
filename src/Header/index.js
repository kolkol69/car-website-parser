import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, FormGroup, FormControl, Button } from 'react-bootstrap'
import './style.css'

export default class Header extends Component {
  constructor(props){
    super(props);

    this.textInputRef = React.createRef();
  };

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#home">RST.UA</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Text>
            <Link className='nav-item' to='/'>Home</Link>
          </Navbar.Text >
          <Navbar.Text>
            <Link className='nav-item' to='/cars'>Cars</Link>
          </Navbar.Text >
          {/* <Navbar.Form > */}
            {/* <FormGroup>
              <FormControl ref={this.textInputRef} onChange={this.handleInputChange} type="text" placeholder="Search" />
            </FormGroup>{'  '} */}
            {/* <Button type="submit">Submit</Button> */}
          {/* </Navbar.Form> */}
        </Navbar.Collapse>
      </Navbar>
    )
  }
  handleInputChange = (e) => {
    console.log('e',e.target.value);
  }
}