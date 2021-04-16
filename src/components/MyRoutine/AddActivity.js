import React, { useState, useEffect } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';


const AddActivity = (props) => {
    console.log("props", props)
    const { data, setAddActy } = props;
    console.log("🚀 ~ file: AddActivity.js ~ line 8 ~ AddActivity ~ data", data)
    let history = useHistory();
    const { postID } = useParams();
    console.log(postID)
    const [activity, setActivity] = useState({
        count: data.count ? data.count : "",
        duration: data.duration ? data.duration : "",
        activityList: JSON.parse(localStorage.getItem('activites')) || [],
        selectedActy: '',
        routineId: data.data.id ? data.data.id : 0,
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
        console.log("🚀 ~ file: AddActivity.js ~ line 29 ~ validateActivity ~ activity", `https://fitnesstrac-kr.herokuapp.com/api/routines/${data.data.id}/activities`)
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
        fetch(`https://fitnesstrac-kr.herokuapp.com/api/routines/${activity.routineId}/activities`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                activityId: activity.selectedActy,
                count: activity.count,
                duration: activity.duration,
            })
        }).then(response => response.json())
            .then(result => {
                console.log(result);
                console.log("🚀 ~ file: AddActivity.js ~ line 73 ~ updateRoutine ~ result", result)
                if (result && result.message) {
                    setSuccessMessage(result.message);
                } else {
                    setSuccessMessage("Your Routine is successfully created")
                    setAddActy(false);
                }
                setSuccess(true)
                setEdit(false)
            })
            .catch(console.error);
    }

    return (
        <div className="log" style={{ backgroundColor: "lightgrey" }}>
            <div>
                <h1>Add Activity to routine</h1>
                <label htmlFor="select-classification">Activity</label>
                <select
                    count="classification"
                    id="select-classification"
                    value={activity.selectedActy}
                    onChange={(e) => setActivity({ ...activity, selectedActy: e.target.value })}>
                    <option value=""></option>
                    {activity.activityList && activity.activityList.length > 0 && activity.activityList.map((item, index) => {
                        return (
                            <option value={item.id} key={index}>{item.name}</option>
                        )
                    })}
                </select><br />
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
                <button onClick={validateActivity}>Add Activity</button><br />
                <button onClick={() => setAddActy(false)}>Cancel</button><br />
                {success ? successMessage : null}
            </div>

        </div>
    )
}

export default AddActivity;


