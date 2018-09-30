import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import './style.css'

const Header = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#home">RST.UA</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem eventKey={1}>
        <Link className='nav-item' to='/'>Home</Link>
      </NavItem >
      <NavItem eventKey={2}>
        <Link className='nav-item' to='/cars'>Cars</Link>
      </NavItem >
    </Nav>
  </Navbar>
)

export default Header;