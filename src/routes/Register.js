import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

const Register = () => {
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
        fetch(`http://fitnesstrac-kr.herokuapp.com/api/users/register`, {
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
                if (result && result.token) {
                    localStorage.setItem('token', result.token);
                    localStorage.setItem('user', JSON.stringify(result.user));
                    return history.push('/myroutines');
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
                <h1>Register</h1>
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
                <button onClick={validateForm}>Sign Up</button>
                <p>Already have an account? <Link to="/login">Sign In</Link></p>
            </div>
        </div>
    )
}























export default Register;
