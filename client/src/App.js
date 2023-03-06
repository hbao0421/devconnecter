import React,{Fragment, useEffect} from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import {Provider} from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-from/CreateProfile';
import PrivateRoute from './components/routing/PrivateRoute';
import EditProfile from './components/profile-from/EditProfile';
import AddExperience from './components/profile-from/AddExperience';
import AddEducation from './components/profile-from/AddEducation';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App=()=> {
  useEffect(()=>{
    store.dispatch(loadUser());
  },[]);
  return (
    <Provider store={store}>
        <Router forcerefresh={true}>
        <Fragment>
          <Navbar/>
          <Route exact path='/' component={Landing}/>
          <section className='container'>
            <Alert/>
            <Switch>
              <Route exact path='/register' component={Register}></Route>
              <Route exact path='/login' component={Login}></Route>
              <PrivateRoute exact path='/dashboard' component={Dashboard}></PrivateRoute>
              <PrivateRoute exact path='/create-profile' component={CreateProfile}></PrivateRoute>
              <PrivateRoute exact path='/edit-profile' component={EditProfile}></PrivateRoute>
              <PrivateRoute exact path='/add-experience' component={AddExperience}></PrivateRoute>
              <PrivateRoute exact path='/add-education' component={AddEducation}></PrivateRoute>
            </Switch>
          </section>
        </Fragment>
      </Router>  
    </Provider>
  
  );

}

export default App;
