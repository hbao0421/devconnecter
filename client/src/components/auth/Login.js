import React,{Fragment,useState} from 'react'
import {Link,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import proptype from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({login,isAuthenticated}) => {
  const [fromData,setFormData] = useState({
    email:'',
    password:'',
  });

  const {email,password} = fromData;

  const onchange=e => setFormData({...fromData,[e.target.name]:e.target.value});
  const onSubmit=async e => {
    e.preventDefault();
    login(email,password);
  }
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
}

  return <Fragment>
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead"><i className="fas fa-user"></i> Sign in Your Account</p>
        <form className="form" onSubmit={e=>onSubmit(e)}>
          <div className="form-group">
            <input type="email" placeholder="Email Address" name="email" value={email} onChange={e=>onchange(e)} required/>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password} onChange={e=>onchange(e)}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
  </Fragment>
  };
    
Login.prototype={
  login:proptype.func.isRequired,
  isAuthenticated:proptype.bool,
}

const mapStateToProps = state =>({
  isAuthenticated:state.auth.isAuthenticated
});

export default connect(mapStateToProps,{login})(Login);
