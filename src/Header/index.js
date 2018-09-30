import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from 'react-bootstrap'
import './style.css'

const Header = (props) =>{
    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
        <Navbar.Brand>
      <a href="/cars">RST.UA</a>
    </Navbar.Brand>
          <Navbar.Toggle />
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
  export default Header