import React,{Fragment} from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import {Provider} from 'react-redux';
import store from './store';

const App=()=> (
  <Provider store={store}>
      <Router>
      <Fragment>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Landing/>}/>
        </Routes>
        <section className='container'>
          <Routes>
            <Route exact path='/register' element={<Register/>}></Route>
            <Route exact path='/login' element={<Login/>}></Route>
          </Routes>
        </section>
      </Fragment>
    </Router>  
  </Provider>

);

export default App;
