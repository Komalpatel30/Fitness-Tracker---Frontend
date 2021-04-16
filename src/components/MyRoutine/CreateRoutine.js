import React, { useState, useEffect } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';


const CreateRoutine = (props) => {
    console.log("props", props)

    let history = useHistory();
    const { postID } = useParams();
    console.log(postID)
    const [routineData, setRoutineData] = useState({
        name: "",
        goal: "",
        Checkbox: false
    })
    const [error, setError] = useState({
        name: false,
        goal: false,
        Checkbox: false
    })

    const [successMessage, setSuccessMessage] = useState("")

    const [success, setSuccess] = useState(false)

    const validateRoutine = () => {
        let formError = {};
        let valid = true;
        console.log("🚀 ~ file: CreateRoutine.js ~ line 31 ~ validateRoutine ~ routineData", routineData)
        if (routineData.name.length < 3) {
            valid = false;
            formError = { ...formError, name: true }
        }
        if (routineData.goal.length < 3) {
            valid = false;
            formError = { ...formError, goal: true }
        }
        setError(formError)
        if (valid) {
            submitForm()
        }
    }

    const submitForm = () => {
        fetch('https://fitnesstrac-kr.herokuapp.com/api/routines', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: routineData.name,
                goal: routineData.goal,
                isPublic: true
            })
        }).then(response => response.json())
            .then(result => {
                console.log("🚀 ~ file: CreateRoutine.js ~ line 71 ~ submitForm ~ result", result)
                if (result && result.error) {
                    setSuccessMessage(result.message)
                    setSuccess(true)
                }
                else {
                    setSuccessMessage("Your Routine is successfully created")
                    setSuccess(true)
                    return history.push('/myroutines');
                }
            })
            .catch(console.error);
    }

    return (
        <div className="log" style={{ backgroundColor: "lightgrey" }}>
            <div>
                <h1>Add New Routine</h1>
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
                {/* <input type="checkbox" value={routineData.Checkbox}
                    onChange={(e) => {
                        setRoutineData({ ...routineData, Checkbox: !routineData.Checkbox })
                    }} />
                <label>Public</label><br /><br /> */}
                <button onClick={validateRoutine}>Create Routine</button><br />
                {success ? successMessage : null}
            </div>

        </div>
    )
}

export default CreateRoutine;


