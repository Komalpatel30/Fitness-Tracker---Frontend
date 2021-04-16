import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Routines/Card';
import ActivityCard from '../components/Routines/ActivityCard';
import UpdateRoutine from '../components/MyRoutine/UpdateRoutine';

import { Loading } from '../components';
import AddActivity from '../components/MyRoutine/AddActivity';
import UpdateActivity from '../components/MyRoutine/UpdateActivity';

const MyRoutines = () => {

    const [routine, setRoutine] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || {}))
    console.log("🚀 ~ file: MyRoutines.js ~ line 14 ~ MyRoutines ~ user", user)
    const [routineActivityData, setRoutineActivityData] = useState(null);
    const [edit, setEdit] = useState(false);

    const [editData, setEditData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [addActy, setAddActy] = useState(false);
    const [editAct, setEditAct] = useState(false);
    const [editActData, setEditActData] = useState({});

    useEffect(() => {
        if (user && user.username) {
            getPublicRoutine()
        } else {
            setRoutine();
        }
    }, [!edit, !addActy]);

    const getPublicRoutine = () => {
        setIsLoading(true);
        fetch(`https://fitnesstrac-kr.herokuapp.com/api/users/${user.username}/routines`, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
            .then(result => {
                console.log("🚀 ~ file: MyRoutines.js ~ line 35 ~ getPublicRoutine ~ result", result)
                console.log(result);
                setRoutine(result)
                setIsLoading(false);
            })
            .catch(error => {
                console.log("🚀 ~ file: MyRoutines.js ~ line 40 ~ getPublicRoutine ~ error", error)
                setIsLoading(false);
            });
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

    const handleDelete = (id) => {
        console.log("🚀 ~ file: MyRoutines.js ~ line 63 ~ handleDelete ~ id", id)
        fetch(`https://fitnesstrac-kr.herokuapp.com/api/routines/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => response.json())
            .then(result => {
                console.log("🚀 ~ file: MyRoutines.js ~ line 72 ~ handleDelete ~ result", result)
                getPublicRoutine();
            })
            .catch(console.error);
    }

    const handleDeleteAct = (id) => {
        console.log("🚀 ~ file: MyRoutines.js ~ line 63 ~ handleDelete ~ id", id)
        fetch(`https://fitnesstrac-kr.herokuapp.com/api/routine_activities/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => response.json())
            .then(result => {
                console.log("🚀 ~ file: MyRoutines.js ~ line 72 ~ handleDelete ~ result", result)
                getPublicRoutine();
            })
            .catch(console.error);
    }

    return (
        <div>
            <div className="postcardsearch">
                <h1>MyRoutines</h1>
                <div className="searchinput"><label>Search your Routines</label>
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
                <Link to="routine/add">(ADD New Routine)</Link>
            </div>
            <div style={{ display: 'flex', maxHeight: '80vh', overflowY: 'scroll' }}>
                <div style={{ width: '50%', overflowY: 'scroll' }}>
                    {routine.map((postcard, index) => (
                        <Card
                            from="myRoutine"
                            data={postcard}
                            key={index}
                            setRoutineActivityData={setRoutineActivityData}
                            setEditData={setEditData}
                            setEdit={setEdit}
                            setIsLoading={setIsLoading}
                            setAddActy={setAddActy}
                            handleDelete={(id) => handleDelete(id)}
                        />
                    ))}
                </div>
                <div style={{ width: '50%', overflowY: 'scroll' }}>
                    {edit ?
                        <UpdateRoutine data={editData} setEdit={setEdit} />
                        : addActy ?
                            <AddActivity data={routineActivityData} editAct={editAct} editActData={editActData} setAddActy={setAddActy} />
                            : editAct ?
                                <UpdateActivity data={routineActivityData} editAct={editAct} editActData={editActData} setEditAct={setEditAct} />
                                :
                                <ActivityCard routineActivityData={routineActivityData} setEditAct={setEditAct} setEditActData={setEditActData} handleDeleteAct={(id) => handleDeleteAct(id)} />
                    }
                </div>
            </div>
            {!isLoading ? null : <Loading />}
        </div>
    )
}

export default MyRoutines;


//  <Link to="posts/add/:postID">(ADD routine)</Link>


