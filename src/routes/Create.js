import React, { useState, useEffect } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';


const Create = (props) => {
    console.log("props", props)
    // const editData = localStorage.getItem('editData')
    // console.log("editdata", JSON.parse(editData))

    let history = useHistory();
    const { postID } = useParams();
    console.log(postID)
    const [post, setPost] = useState({
        Title: "",
        Description: "",
        Price: 0,
        Location: "",
        Checkbox: false
    })
    const [error, setError] = useState({
        Title: false,
        Description: false,
        Price: false,
        Location: false,
        Checkbox: false
    })

    const [successMessage, setSuccessMessage] = useState("")

    const [success, setSuccess] = useState(false)

    const validatePost = () => {
        let formError = {};
        let valid = true;

        if ((post.Title).length < 3) {
            valid = false;
            formError = { ...formError, Title: true }
        }
        if ((post.Description).length < 3) {
            valid = false;
            formError = { ...formError, Description: true }
        }
        if (post.Price <= 0) {
            valid = false;
            formError = { ...formError, Price: true }
        }
        // if ((post.Location).length < 3) {
        //     valid=false;
        //     formError={...formError, Location: true}
        // } 
        // if ((!post.Checkbox)) {
        //     valid=false;
        //     formError={...formError, Checkbox: true}
        // } 
        setError(formError)
        if (valid) {
            submitForm()
        }
    }

    useEffect(() => {
        let editData = localStorage.getItem('editData')
        console.log("editdata", editData);
        const editData2 = JSON.parse(editData);
        if (editData && editData.length > 0) {
            setPost({
                Title: editData2.title,
                Description: editData2.description,
                Price: editData2.price,
                Location: editData2.location,
                Checkbox: editData2.willDeliver,
            })
        }
    }, [])

    console.log('post', post);
    const submitForm = () => {
        console.log("token414", `Bearer ${localStorage.getItem('token')}`)
        fetch('https://fitnesstrac-kr.herokuapp.com/api/2010-UNF-HY-WEB-PT/posts', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                post: {
                    title: post.Title,
                    description: post.Description,
                    price: (post.Price).toString(),
                    willDeliver: post.Checkbox
                }
            })
        }).then(response => response.json())
            .then(result => {
                console.log(result);
                if (result.success) {
                    setSuccessMessage("Your post is successfully created")
                    setSuccess(true)
                }
                else {
                    setSuccessMessage(result.error.message)
                    setSuccess(true)
                }
            })
            .catch(console.error);
    }

    return (
        <div className="log" style={{ backgroundColor: "lightgrey" }}>
            <div>
                <h1>Add New Post</h1>
                <label>Title</label>
                <input
                    onChange={(e) => {
                        setPost({ ...post, Title: e.target.value })
                    }}
                    type="text"
                    id="keywords"
                    placeholder="Username..."
                    value={post.Title} /><br />
                {error.Title ? "Please enter valid title" : null}<br />
                <label>Description</label>
                <input
                    onChange={(e) => {
                        setPost({ ...post, Description: e.target.value })
                    }}
                    type="text"
                    id="keywords"
                    placeholder="Description..."
                    value={post.Description} /><br />
                {error.Description ? "Please enter valid Description" : null}<br />

                <label>Price</label>
                <input
                    onChange={(e) => {
                        setPost({ ...post, Price: e.target.value })
                    }}
                    type="number"
                    id="keywords"
                    placeholder="Price..."
                    value={post.Price} /><br />
                {error.Price ? "Please enter valid Price" : null}<br />

                <label>Location</label>
                <input
                    onChange={(e) => {
                        setPost({ ...post, Location: e.target.value })
                    }}
                    type="text"
                    id="keywords"
                    placeholder="Location..."
                    value={post.Location} /><br />
                {error.Location ? "Please enter valid Location" : null}<br />
                {error.submitError ? error.errorMessage : null}<br />
                <input type="checkbox" value={post.Checkbox}
                    onChange={(e) => {
                        setPost({ ...post, Checkbox: !post.Checkbox })
                    }} />
                <label> Willing to Deliver</label><br />
                <button onClick={validatePost}>Create</button><br />
                {success ? successMessage : null}
            </div>

        </div>
    )
}

export default Create;


