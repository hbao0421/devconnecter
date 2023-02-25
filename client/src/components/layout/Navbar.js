import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({logout,auth:{isAuthenticated,loading}})=>{
  const authLinks=(
    <ul>
      <li>
        <Link to="/Dashboard">
        <i className='fas fa-sign-out-alt'></i> 
        <span className='hide-sm'> Dashboard</span>   
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
          </a>
      </li>
    </ul>
  );
  const guestLinks=(
    <ul>
      <li><Link to="profiles.html">Developers</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  );
    return(
        <nav className="navbar bg-dark">
        <h1>
          <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
        </h1>
        {!loading&&(<Fragment>{isAuthenticated?authLinks:guestLinks}</Fragment>)}
      </nav>
    )
}
Navbar.propTypes={
  logout:propTypes.func.isRequired,
  auth:propTypes.object.isRequired
}
const mapStateToPops = state =>({
  auth:state.auth
});

export default connect(mapStateToPops,{logout})(Navbar);