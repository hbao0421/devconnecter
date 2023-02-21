import React,{Fragment,useState,useEffect} from 'react'
import {connect} from 'react-redux';
import {Link,useNavigate } from 'react-router-dom';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';
import propTypes from 'prop-types';

const Register = ({setAlert,register,isAuthenticated}) => {
  const [fromData,setFormData] = useState({
    name:'',
    email:'',
    password:'',
    password2:''
  });

  const navigate = useNavigate();

  const {name,email,password,password2} = fromData;

  const onchange=e => setFormData({...fromData,[e.target.name]:e.target.value});
  const onSubmit=async e => {
    e.preventDefault();
    if(password!==password2){
      setAlert('Password do not match','danger');
    }else{
      register({name,email,password});
    }
  }

  useEffect(() => {
    if (isAuthenticated){
       return navigate("/dashboard");
    }
 },[isAuthenticated]);

  return <Fragment>
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
        <form className="form" onSubmit={e=>onSubmit(e)}>
          <div className="form-group">
            <input type="text" placeholder="Name" name="name" value={name} onChange={e=>onchange(e)} required />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Email Address" name="email" value={email} onChange={e=>onchange(e)} required/>
            <small className="form-text">
              This site uses Gravatar so if you want a profile image, use a Gravatar email
            </small>
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
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
              value={password2} onChange={e=>onchange(e)}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
  </Fragment>
  };

  Register.propTypes = {
    setAlert:propTypes.func.isRequired,
    register:propTypes.func.isRequired,
    isAuthenticated:propTypes.bool,
  }

  const mapStateToProps = state =>({
    isAuthenticated:state.auth.isAuthenticated
  });
    


export default connect(mapStateToProps,{setAlert,register})(Register);
