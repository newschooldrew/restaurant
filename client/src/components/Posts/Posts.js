import React, {useContext, useEffect, useState} from 'react'
import AuthContext from '../../AuthContext'
import {fetchAllPosts,postComment, fetchPosts} from '../../actions'
import update from 'react-addons-update'

const Posts = () => {
    const {state,dispatch} = useContext(AuthContext)
    const {username,allPosts,newComment} = state;
    const [comment, setComment] = useState({})
    const [comment_id, setId] = useState('')
    const [editMode, setEditMode] = useState(false)
    const [key, setKey] = useState('')
    
    console.log("state:")
    console.log(state)
    console.log("allPosts:")
    console.log(allPosts)
    console.log("newComment:")
    console.log(newComment)

    useEffect(() =>{
        fetchAllPosts(username,dispatch)

    },[username,newComment])

    let new_comment;

    const formatDate = date =>{
        const newDate = new Date(date).toLocaleDateString('en-US');
        const newTime = new Date(date).toLocaleTimeString('en-US')
        return `${newDate} at ${newTime}`
    }

    const editComment = () =>{
        console.log("Edit hit")
        setEditMode(!editMode)
    }

    const handleChange = e => {
        e.persist()
        setId(e.target.id)
        setComment({[e.target.id]:e.target.value});
        new_comment = comment[e.target.id]
        setKey(e.target.getAttribute('data-mongo-id'))
    }
    
    const handleSubmit =  async e =>{
        console.log(key)
        console.log(e.target.getAttribute('data-mongo-id'))

        const newData = update(key,{
            $set:e.target.getAttribute('data-mongo-id')
        })

        const new_comment = comment[comment_id]
        await postComment(new_comment, username,comment_id,newData,dispatch)
        await setComment('');
    }

    return (
        <div>
            {allPosts && allPosts.map((post,i) => {
                console.log("post:")
                console.log(post)
                const nestedComments = post.comments;

                let iteratedComments;
                return(
                <div>
                
                <br />
                                <div>{post._id}</div>
                                <div>{post.title}</div>
                                <div>{post.content}</div>
                                <div>Written by:{post.username}</div>
                                <br />
                                <ul>
                                {post.comments.map(sub =>
                                    <li>
                                        {post.username == username ? (<a role="button" onClick={editComment}>edit</a>):null}
                                        {editMode ? (<input type="text" value={sub.content}/>) :(<div>{sub.content}</div> )}
                                        <div>by: {sub.commenter}</div>
                                        <div>by: {sub._id}</div>
                                        <div>Date posted: {formatDate(sub.createdDate)}</div>
                                        <br />
                                    </li>
                                    )}
                                </ul>
                                <textarea key={post._id} id={i} onChange={handleChange}></textarea>
                            <button data-mongo-id={post._id} onClick={handleSubmit}>Leave a Comment</button>
                            {/* {allComments.map(comment =>{<div>{comment.content}</div>})} */}

                            </div>)                    
                }
            )}

        </div>
    )
}

export default Posts