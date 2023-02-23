import React,{useEffect} from 'react'
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({getCurrentProfile,auth,profile}) => {
  useEffect(()=>{
    getCurrentProfile();
  },[]);
  return (
    <div>
      Dashboard
    </div>
  )
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
