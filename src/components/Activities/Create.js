import React, { useState, useEffect } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';


const Create = (props) => {
    console.log("props", props)
    let history = useHistory();
    const { postID } = useParams();
    console.log(postID)
    const [activity, setActivity] = useState({
        name: "",
        description: "",
    })
    const [error, setError] = useState({
        name: false,
        description: false,
    })

    const [successMessage, setSuccessMessage] = useState("")

    const [success, setSuccess] = useState(false)

    const validateActivity = () => {
        let formError = {};
        let valid = true;

        if ((activity.name).length < 3) {
            valid = false;
            formError = { ...formError, name: true }
        }
        if ((activity.description).length < 3) {
            valid = false;
            formError = { ...formError, description: true }
        }
        setError(formError)
        if (valid) {
            submitForm()
        }
    }

    const submitForm = () => {
        console.log("token414", `Bearer ${localStorage.getItem('token')}`)
        fetch('https://fitnesstrac-kr.herokuapp.com/api/activities', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: activity.name,
                description: activity.description
            })
        }).then(response => response.json())
            .then(result => {
                console.log(result);
                console.log("🚀 ~ file: Create.js ~ line 72 ~ submitForm ~ result", result)
                if (result && result.error) {
                    setSuccessMessage(result.message)
                    setSuccess(true)
                }
                else {
                    setSuccessMessage("Your Activities is successfully created")
                    setSuccess(true)
                    return history.push('/activities');
                }
            })
            .catch(console.error);
    }

    return (
        <div className="log" style={{ backgroundColor: "lightgrey" }}>
            <div>
                <h1>Add New Activity</h1>
                <label>Name : </label>
                <input
                    onChange={(e) => {
                        setActivity({ ...activity, name: e.target.value })
                    }}
                    type="text"
                    id="keywords"
                    placeholder="Username..."
                    value={activity.name} /><br />
                {error.name ? "Please enter valid title" : null}<br />
                <label>Description : </label>
                <input
                    onChange={(e) => {
                        setActivity({ ...activity, description: e.target.value })
                    }}
                    type="text"
                    id="keywords"
                    placeholder="description..."
                    value={activity.description} /><br />
                {error.description ? "Please enter valid description" : null}<br />
                {error.submitError ? error.errorMessage : null}<br />
                <button onClick={validateActivity}>Create</button><br />
                {success ? successMessage : null}
            </div>

        </div>
    )
}

export default Create;


