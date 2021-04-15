import React, { useState, useEffect } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';


const UpdateActivity = (props) => {
    console.log("props", props)
    const { data, setAddActy, setEditAct, editActData } = props;
    console.log("🚀 ~ file: UpdateActivity.js ~ line 8 ~ UpdateActivity ~ data", data)
    let history = useHistory();
    const { postID } = useParams();
    console.log(postID)
    const [activity, setActivity] = useState({
        count: editActData.count ? editActData.count : "",
        duration: editActData.duration ? editActData.duration : "",
        activityList: JSON.parse(localStorage.getItem('activites')) || [],
        selectedActy: '',
        routineId: editActData.routineActivityId ? editActData.routineActivityId : 0,
    })
    const [error, setError] = useState({
        count: false,
        duration: false
    })

    const [successMessage, setSuccessMessage] = useState("")
    const [success, setSuccess] = useState(false)

    const validateActivity = () => {
        let formError = {};
        let valid = true;
        // console.log("🚀 ~ file: UpdateActivity.js ~ line 29 ~ validateActivity ~ activity", `http://fitnesstrac-kr.herokuapp.com/api/routines/${data.data.id}/activities`)
        // if ((activity.count).length < 3) {
        //     valid = false;
        //     formError = { ...formError, count: true }
        // }
        // if ((activity.duration).length < 3) {
        //     valid = false;
        //     formError = { ...formError, duration: true }
        // }
        // setError(formError)
        if (valid) {
            updateRoutine()
        }
    }

    const updateRoutine = () => {
        fetch(`http://fitnesstrac-kr.herokuapp.com/api/routine_activities/${activity.routineId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                count: activity.count,
                duration: activity.duration,
            })
        }).then(response => response.json())
            .then(result => {
                console.log(result);
                console.log("🚀 ~ file: UpdateActivity.js ~ line 73 ~ updateRoutine ~ result", result)
                if (result && result.message) {
                    setSuccessMessage(result.message);
                } else {
                    setSuccessMessage("Your Routine is successfully created")
                    setEditAct(false);
                }
                setSuccess(true)
                setEdit(false)
            })
            .catch(console.error);
    }

    return (
        <div className="log" style={{ backgroundColor: "lightgrey" }}>
            <div>
                <h1>Update Activity of routine</h1>
                <label htmlFor="select-classification">Activity: {editActData.name}</label><br /><br />
                <label>Count : </label>
                <input
                    onChange={(e) => {
                        setActivity({ ...activity, count: e.target.value })
                    }}
                    type="text"
                    id="keywords"
                    placeholder="count..."
                    value={activity.count} /><br />
                {error.count ? "Please enter your count" : null}<br />
                <label>Duration : </label>
                <input
                    onChange={(e) => {
                        setActivity({ ...activity, duration: e.target.value })
                    }}
                    type="text"
                    id="keywords"
                    placeholder="Duration..."
                    value={activity.duration} /><br />
                {error.duration ? "Please enter valid duration desrciption" : null}
                {error.submitError ? error.errorMessage : null}<br />
                <button onClick={validateActivity}>Update Activity</button><br />
                <button onClick={() => setEditAct(false)}>Cancel</button><br />
                {success ? successMessage : null}
            </div>

        </div>
    )
}

export default UpdateActivity;


