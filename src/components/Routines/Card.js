import React, { useState, useEffect } from 'react';
// import { Link, useHistory } from 'react-router-dom';
// import Create from '../../routes/Create';
// import AddPost from '../../routes/Create'


const Card = (data) => {
    console.log("Card ~ data", data)
    const { setRoutineActivityData, setEditData, setEdit, setIsLoading, handleDelete, setAddActy } = data;

    return (
        <div className="routineCard">
            <h2 style={{ lineHeight: '20px' }}>Name: {data.data.name}</h2>
            <h3 style={{ lineHeight: '20px' }}>Goal: {data.data.goal}</h3>
            <h4 style={{ cursor: 'pointer' }} onClick={() => {
                setRoutineActivityData(data);
            }}>CreatorName: {data.data.creatorName}</h4>
            {data.from === "myRoutine"
                ?
                <>
                    <button
                        onClick={() => {
                            setEdit(true);
                            setEditData(data.data);
                        }}>
                        Edit
          </button>
                    <button
                        onClick={() => handleDelete(data.data.id)}>Delete</button>
                    <button
                        onClick={() => { setAddActy(true); setRoutineActivityData(data); }}>Add Activity</button>
                </>
                : null}
        </div >
    )
}

export default Card;
