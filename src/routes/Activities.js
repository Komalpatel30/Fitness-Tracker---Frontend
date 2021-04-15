import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Activities/Card';
import ActivityCard from '../components/Activities/ActivityCard';
import Update from '../components/Activities/Update';

import { Loading } from '../components';

const Activities = () => {

    const [activity, setActivity] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [routineActivityData, setRoutineActivityData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const [editAct, setEditAct] = useState(false);
    const [editActData, setEditActData] = useState({});

    useEffect(() => {
        getPublicRoutine()
    }, [!editAct]);

    const getPublicRoutine = () => {
        setIsLoading(true);
        console.log("token2", `Bearer ${token}`)
        fetch('http://fitnesstrac-kr.herokuapp.com/api/activities', {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
            .then(result => {
                console.log(result);
                localStorage.setItem('activites', JSON.stringify(result));
                setActivity(result)
                setIsLoading(false);
            })
            .catch(console.error);
    }

    const handleSearch = (name) => {
        let newArray = [];
        if (name.length <= 0) {
            newArray = activity
        } else {
            activity.map((item) => {
                if ((item.name).includes(name)) {
                    newArray = [...newArray, item]
                }
            })
        }
        if (name.length > 0) {
            setActivity(newArray)
        } else {
            getPublicRoutine()
        }
    }

    return (
        <div>
            <div className="postcardsearch">
                <h1>Activities</h1>
                <div className="searchinput"><label>Search Activities</label>
                    <input
                        onChange={(e) => {
                            setSearchInput(e.target.value)
                            handleSearch(e.target.value)
                        }}
                        type="text"
                        placeholder="Search your favorite activity..."
                        value={searchInput} /><br />
                </div>
                {/* {error.userName ? "Please enter valid username" : null}<br/> */}
                {token && token.length > 0 ? <Link to="activity/add">(ADD activity)</Link> : null}
            </div>
            <div style={{ display: 'flex', maxHeight: '75vh', overflowY: 'scroll' }}>
                <div style={{
                    widht: '50%', overflowY: 'scroll'
                }}>
                    {
                        activity.map((postcard, index) => (
                            <Card
                                from="activities"
                                data={postcard}
                                key={index}
                                setEditAct={setEditAct}
                                setEditActData={setEditActData}
                            />
                        ))
                    }
                </div>
                {editAct ?
                    <Update data={routineActivityData} editAct={editAct} editActData={editActData} setEditAct={setEditAct} /> :
                    null
                    // <ActivityCard routineActivityData={routineActivityData} setEditAct={setEditAct} setEditActData={setEditActData} handleDeleteAct={(id) => handleDeleteAct(id)} />
                }
            </div>
            {!isLoading ? null : <Loading />}
        </div>
    )
}

export default Activities;


