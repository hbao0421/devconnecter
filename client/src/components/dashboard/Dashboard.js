import React,{Fragment, useEffect} from 'react'
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardAction from './DashboardAction';

const Dashboard = ({getCurrentProfile,auth:{user},profile:{profile,loading}}) => {
  useEffect(()=>{
    getCurrentProfile();
  },[]);
  return loading && profile===null? <Spinner/>:<Fragment>
    <h1 className='large text-primary'>Dashboard</h1>
    <p className='lead'>
      <i className='fas fa-user'> Welcome {user&&user.name}</i>
    </p>
    {profile!==null?<Fragment><DashboardAction/></Fragment>:<Fragment>
      <p>You have not yet set up a profile</p>
      <Link to='create-profile' className='btn btn-primary my-1'>Create Profile</Link>
      </Fragment>}
  </Fragment>;
}
Dashboard.propTypes = {
  getCurrentProfile:propTypes.func.isRequired,
  auth:propTypes.object.isRequired,
  profile:propTypes.object.isRequired,
}

const mapStateToProps= state=>({
  auth:state.auth,
  profile:state.profile
})

export default connect(mapStateToProps,{getCurrentProfile})(Dashboard); 
