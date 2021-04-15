import React, { useState, useEffect } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';


const UpdateRoutine = (props) => {
    console.log("props", props)
    const { data, setEdit } = props;
    let history = useHistory();
    const { postID } = useParams();
    console.log(postID)
    const [routineData, setRoutineData] = useState({
        name: data.name ? data.name : "",
        goal: data.goal ? data.goal : ""
    })
    const [error, setError] = useState({
        name: false,
        goal: false
    })

    const [successMessage, setSuccessMessage] = useState("")
    const [success, setSuccess] = useState(false)

    const validateRoutine = () => {
        let formError = {};
        let valid = true;
        if ((routineData.name).length < 3) {
            valid = false;
            formError = { ...formError, name: true }
        }
        if ((routineData.goal).length < 3) {
            valid = false;
            formError = { ...formError, goal: true }
        }
        setError(formError)
        if (valid) {
            updateRoutine()
        }
    }

    const updateRoutine = () => {
        fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${data.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: routineData.name,
                goal: routineData.goal,
            })
        }).then(response => response.json())
            .then(result => {
                console.log(result);
                console.log("🚀 ~ file: UpdateRoutine.js ~ line 73 ~ updateRoutine ~ result", result)
                setSuccessMessage("Your Routine is successfully created")
                setSuccess(true)
                setEdit(false)
            })
            .catch(console.error);
    }

    return (
        <div className="log" style={{ backgroundColor: "lightgrey" }}>
            <div>
                <h1>Update Routine</h1>
                <label>Name : </label>
                <input
                    onChange={(e) => {
                        setRoutineData({ ...routineData, name: e.target.value })
                    }}
                    type="text"
                    id="keywords"
                    placeholder="Routine name..."
                    value={routineData.name} /><br />
                {error.name ? "Please enter your name" : null}<br />
                <label>Goal : </label>
                <input
                    onChange={(e) => {
                        setRoutineData({ ...routineData, goal: e.target.value })
                    }}
                    type="text"
                    id="keywords"
                    placeholder="Description..."
                    value={routineData.goal} /><br />
                {error.goal ? "Please enter valid goal desrciption" : null}
                {error.submitError ? error.errorMessage : null}<br />
                <button onClick={validateRoutine}>Update Routine</button><br />
                <button onClick={() => setEdit(false)}>Cancel</button><br />
                {success ? successMessage : null}
            </div>

        </div>
    )
}

export default UpdateRoutine;


