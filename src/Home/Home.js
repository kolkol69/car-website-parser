import React from 'react';
import {Link} from 'react-router-dom';
import './style.css';
const Home = () => (
    <div>
      <div className="header">
        <div className="sides">
        </div>
        <div className="info">
          <h1><Link className='car-link' to='/cars'>CAR LIST</Link></h1>
        </div>
      </div>
    </div>
  );

export default Home;
