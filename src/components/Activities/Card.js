import React, { useState, useEffect } from 'react';
// import { Link, useHistory } from 'react-router-dom';
// import Create from '../../routes/Create';
// import AddPost from '../../routes/Create'


const Card = (data) => {
    const token = localStorage.getItem("token");

    const hasToken = token && token.length > 0 ? true : false;

    const from = data && data.from || '';
    const setEditAct = data && data.setEditAct || '';
    const setEditActData = data && data.setEditActData || '';
    return (
        <div className="activityCard">
            <h2>Name: {data.data.name}</h2>
            <h3>Description: {data.data.description}</h3>
            {hasToken
                ?
                <>
                    <button
                        onClick={() => {
                            setEditAct(true);
                            setEditActData(data.data);
                        }}>
                        Edit
                                        </button>
                </>
                : null}
        </div >
    )
}

export default Card;
