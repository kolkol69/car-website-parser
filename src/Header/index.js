import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, FormGroup, FormControl, Button } from 'react-bootstrap'
import './style.css'

export default class Header extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/cars">RST.UA</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Text>
            <Link className='nav-item' to='/'>Home</Link>
          </Navbar.Text >
          <Navbar.Text>
            <Link className='nav-item' to='/cars'>Cars</Link>
          </Navbar.Text >
        </Navbar.Collapse>
      </Navbar>
    )
  }
}