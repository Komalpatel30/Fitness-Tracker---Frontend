import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';




const Header = (props) => {

    console.log("Header ~ props", props)
    const history = useHistory()
    const [token, setToken] = useState(props.token || "");

    useEffect(() => {
        console.log("token201", token)
        setToken(localStorage.getItem("token"))
    }, [props])


    return (
        <div className="headercontainer">
            <h1>FitnessTrackr</h1>
            <h2><Link to="/profile">Home</Link></h2>
            <h2><Link to="/routines">Routines</Link></h2>
            {token && token.length > 0 ?
                <h2><Link to="/myroutines">My Routines</Link></h2> : null}
            <h2><Link to="/activities">Activities</Link></h2>
            {token && token.length > 0 ?
                <h2><Link to="#"
                    onClick={() => {
                        localStorage.setItem("token", "");
                        localStorage.setItem("user", "");
                        history.push({
                            pathname: `/login`,
                        })
                    }}>Log Out</Link></h2>
                : <h2><Link to="/login">SignIn</Link></h2>}
        </div>
    )
}


export default Header;

// <div className="logo">
// <div className="contents"></div>
