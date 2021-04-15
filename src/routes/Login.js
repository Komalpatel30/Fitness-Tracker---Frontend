import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

const Login = ({ getToken }) => {

  let history = useHistory();
  const [userData, setUserData] = useState({
    userName: "",
    password: ""
  })
  const [error, setError] = useState({
    userName: false,
    password: false,
    submitError: false
  })


  const validateForm = () => {
    let formError = {};
    let valid = true;

    if ((userData.userName).length < 3) {
      valid = false;
      formError = { ...formError, userName: true }
    }
    if ((userData.password).length < 3) {
      valid = false;
      formError = { ...formError, password: true }
    }
    setError(formError)
    if (valid) {
      submitForm()
    }
  }

  const submitForm = () => {
    fetch(`https://fitnesstrac-kr.herokuapp.com/api/users/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: userData.userName,
        password: userData.password
      })
    }).then(response => response.json())
      .then(result => {
        console.log("submitForm ~ result", result)
        if (result && result.token) {
          localStorage.setItem('token', result.token);
          localStorage.setItem('user', JSON.stringify(result.user));
          return history.push('/routines');
        }
        else {
          setError({ ...error, submitError: true, errorMessage: result.message })
        }
        console.log(result);
      })
      .catch(console.error);
  }

  return (
    <div className="log">
      <div>
        <h1>Log in</h1>
        <label>Username</label>
        <input
          onChange={(e) => {
            setUserData({ ...userData, userName: e.target.value })
          }}
          type="text"
          id="keywords"
          placeholder="Username..."
          value={userData.userName} /><br />
        {error.userName ? "Please enter valid username" : null}<br />
        <label>Password</label>
        <input
          onChange={(e) => {
            setUserData({ ...userData, password: e.target.value })
          }}
          type="password"
          id="keywords"
          placeholder="Password..."
          value={userData.password} /><br />
        {error.password ? "Please enter valid password" : null}<br />
        {error.submitError ? error.errorMessage : null}<br />
        {/* </form> */}
        <button onClick={validateForm}>Log In</button>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  )
}

export default Login;
