import React,{Fragment, useEffect} from 'react'
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardAction from './DashboardAction';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({getCurrentProfile,deleteAccount,auth:{user},profile:{profile,loading}}) => {
  useEffect(()=>{
    getCurrentProfile();
  },[]);
  return loading && profile===null? <Spinner/>:<Fragment>
    <h1 className='large text-primary'>Dashboard</h1>
    <p className='lead'>
      <i className='fas fa-user'> Welcome {user&&user.name}</i>
    </p>
    {profile!==null?
      <Fragment>
        <DashboardAction/>
        <Experience experience={profile.experience}></Experience>
        <Education education={profile.education}></Education>
        <div className='my-2'>
          <button className='btn btn-danger' onClick={()=>deleteAccount()}>
            <i className='fas fa-user-minus'></i>Delete My Account
          </button>
        </div>
      </Fragment>:<Fragment>
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
  profile:state.profile,
  deleteAccount:propTypes.func.isRequired
})

export default connect(mapStateToProps,{getCurrentProfile,deleteAccount})(Dashboard); 
