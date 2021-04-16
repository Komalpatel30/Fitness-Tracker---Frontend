import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import Card from '../components/Routines/Card';
import ActivityCard from '../components/Routines/ActivityCard';

import { Loading } from '../components';

const Routines = () => {

    const [routine, setRoutine] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [token] = useState(localStorage.getItem('token'))
    const [routineActivityData, setRoutineActivityData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // const [editAct, setEditAct] = useState(false);
    // const [editActData, setEditActData] = useState({});

    useEffect(() => {
        // setToken(localStorage.getItem('token'))
        // setToken(localStorage.getItem('token'))
        // console.log("token", token)
        // if (token && token.length > 0) {
        getPublicRoutine()
        // }
    }, []);

    const getPublicRoutine = () => {
        setIsLoading(true);
        console.log("token2", `Bearer ${token}`)
        fetch('https://fitnesstrac-kr.herokuapp.com/api/routines', {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`
            },
        }).then(response => response.json())
            .then(result => {
                console.log(result);
                setRoutine(result)
                setIsLoading(false);
            })
            .catch(console.error);
    }

    const handleSearch = (name) => {
        let newArray = [];
        if (name.length <= 0) {
            newArray = routine
        } else {
            routine.map((item) => {
                if ((item.name).includes(name)) {
                    newArray = [...newArray, item]
                }
            })
        }
        if (name.length > 0) {
            setRoutine(newArray)
        } else {
            getPublicRoutine()
        }
    }

    return (
        <div>
            <div className="postcardsearch">
                <h1>Routines</h1>
                <div className="searchinput"><label>Search Routines</label>
                    <input
                        onChange={(e) => {
                            setSearchInput(e.target.value)
                            handleSearch(e.target.value)
                        }}
                        type="text"
                        placeholder="Search your favorite routine..."
                        value={searchInput} /><br />
                </div>
                {/* {error.userName ? "Please enter valid username" : null}<br/> */}
                {/* <Link to="posts/add">(ADD routine)</Link> */}
            </div>
            <div style={{ display: 'flex', maxHeight: '80vh', overflowY: 'scroll' }}>
                <div style={{ width: '30%', overflowY: 'scroll' }}>
                    {routine.map((postcard, index) => (
                        <Card
                            data={postcard}
                            key={index}
                            setRoutineActivityData={setRoutineActivityData}
                        />
                    ))}
                </div>
                {<div style={{ width: '70%', overflowY: 'scroll' }}>
                    <ActivityCard routineActivityData={routineActivityData} />
                </div>}
            </div>
            {!isLoading ? null : <Loading />}
        </div>
    )
}

export default Routines;


//  <Link to="posts/add/:postID">(ADD routine)</Link>


