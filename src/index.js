
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';


import Login from './routes/Login';
import Header from './components/Header';
import Register from './routes/Register';
// import AddPost from './routes/Create'
// import PostDetail from './routes/PostDetail';

import Routines from './routes/Routines';
import MyRoutines from './routes/MyRoutines';
import AddRoutine from './components/MyRoutine/CreateRoutine';
import AddActivity from './components/Activities/Create';

import Activities from './routes/Activities';

import './style.css';


const App = (props) => {
  console.log("App ~ props", props)

  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    fetchToken()
  }, [])

  useEffect(() => {
    console.log("useEffect ~ localStorage.getItem('token')", localStorage.getItem('token'))
    setToken(localStorage.getItem('token'))
  }, [localStorage.getItem('token')]);

  const fetchToken = () => {

    let loggedIn = false;
    if (token) {
      fetch('https://fitnesstrac-kr.herokuapp.com/api/users/me', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }).then(response => response.json())
        .then(result => {
          if (result && result.error) {
            localStorage.setItem('token', "");
            return history.push('/login');
          }
          console.log("resultIndexJS:", result);
        })
        .catch(console.error);
    }
  }

  return (
    <div className="app">
      <Header
        token={token}
      />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route exact path="/routines">
          <Routines />
        </Route>
        <Route exact path="/activities">
          <Activities />
        </Route>
        {token
          ?
          <>
            <Route exact path='/activity/add'>
              <AddActivity />
            </Route>
            <Route exact path='/routine/add'>
              <AddRoutine />
            </Route>
            {/* <Route path="/posts/:id">
              <PostDetail />
            </Route> */}
            <Route exact path="/myroutines">
              <MyRoutines />
            </Route>
          </> : null}

      </Switch>
    </div>
  )
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app')
);


// {/* <Login/> */}

//Komal is cool
