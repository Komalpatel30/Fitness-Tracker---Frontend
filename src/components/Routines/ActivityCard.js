import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Create from '../../routes/Create';
import AddPost from '../../routes/Create'


const ActivityCard = (props) => {
    console.log("ActivityCard ~ props", props)
    const data = props && props.routineActivityData && props.routineActivityData.data || '';
    const from = props && props.routineActivityData && props.routineActivityData.from || '';
    const setEditActData = props && props && props.setEditActData || {};
    const setEditAct = props && props.setEditAct || {};
    const handleDeleteAct = props && props.handleDeleteAct || {};
    return (
        <div className="postcard">
            {data && data.activities && data.activities.length > 0 ?
                <>
                    <div style={{ fontSize: "20px", padding: "0.5rem", flexDirection: "column", fontWeight: 600 }}>
                        Routines Name : {data.name}
                    </div>
                    <div style={{ fontSize: "18px", padding: "0.5rem", flexDirection: "column", fontWeight: 600 }}>
                        Routines Goal: {data.goal}
                    </div>
                    <div style={{ fontSize: "16px", padding: "0.5rem", flexDirection: "column", fontWeight: 600 }}>
                        Activity List
            </div>
                    {data.activities.map((item, index) => {
                        return (
                            <div key={index} style={{ borderBottom: '2px solid #2196f3', backgroundColor: '#B0E0E6', borderRadius: 10, margin: 10 }}>
                                <div style={{ fontSize: "20px", padding: "0.5rem", flexDirection: "column" }}>
                                    Name: {item.name}
                                </div>
                                <div style={{ fontSize: "20px", padding: "0.5rem", flexDirection: "column", lineHeight: '1.5rem', }}>
                                    Description: {item.description}
                                </div>
                                <div style={{ fontSize: "20px", padding: "0.5rem", flexDirection: "column" }}>
                                    Duration: {item.duration}
                                </div>
                                {item.count > 0 ? <div style={{ fontSize: "20px", padding: "0.5rem", flexDirection: "column" }}>
                                    Count: {item.count}
                                </div> : null}
                                {from === "myRoutine"
                                    ?
                                    <>
                                        <button
                                            onClick={() => {
                                                setEditAct(true);
                                                setEditActData(item);
                                            }}>
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteAct(item.routineActivityId)}>Delete</button>
                                    </>
                                    : null}
                            </div>
                        )
                    })}
                </> :
                <>
                    <div style={{ fontSize: "20px", padding: "0.5rem", flexDirection: "column", fontWeight: 600, flex: 1 }}>
                        This routine has not activity
            </div>
                </>}
        </div >
    )
}

export default ActivityCard;
