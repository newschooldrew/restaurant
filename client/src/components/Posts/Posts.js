import React, {useContext, useEffect, useState} from 'react'
import AuthContext from '../../AuthContext'
import {fetchAllPosts,postComment} from '../../actions'
import update from 'react-addons-update'

const Posts = () => {
    const {state,dispatch} = useContext(AuthContext)
    const {username,allPosts,allComments} = state;
    const [comment, setComment] = useState({})
    const [comment_id, setId] = useState('')
    const [key, setKey] = useState('')
    console.log("state:")
    console.log(state)
    console.log("allPosts:")
    console.log(allPosts)

    useEffect(() =>{
        fetchAllPosts(username,dispatch)

    },[username])


    let new_comment;
    const handleChange = e => {
        e.persist()
        setId(e.target.id)
        // console.log(comment_id)
        setComment({[e.target.id]:e.target.value});
        // console.log(comment[e.target.id])
        new_comment = comment[e.target.id]
        setKey(e.target.getAttribute('data-mongo-id'))
        // console.log(key)
    }
    
    const handleSubmit =  e =>{
        console.log(key)
        console.log(e.target.getAttribute('data-mongo-id'))

        const newData = update(key,{
            $set:e.target.getAttribute('data-mongo-id')
        })

        // console.log(newData)

        // if(key !== e.target.getAttribute('data-mongo-id')){
        //     console.log("key is different")
        //     setKey(e.target.getAttribute('data-mongo-id'))
        // }
        const new_comment = comment[comment_id]
        console.log(new_comment)
        console.log(comment_id)
        postComment(new_comment, username,comment_id,newData,dispatch)
    }

    return (
        <div>
            {allPosts && allPosts.map((post,i) => {
                const nestedComments = post.comments;
                let currentComments = Object.values(nestedComments);
                const iteratedComments = currentComments.forEach((proj,i) =>{
                        console.log(proj)
                })

                return(
                <div>
                
                <br />
                                <div>{post._id}</div>
                                <div>{post.title}</div>
                                <div>{post.content}</div>
                                <div>Written by:{post.username}</div>
                                <br />
                                {iteratedComments}
                                
                                {/* {currentComments.length > 0  ? {} :null} */}
                                {/* {nestedComments[i] ? (<div>{nestedComments[1].content}</div>) :null} */}

                                <br />
                                {/* <textarea id={_id} onChange={e => setComment(e.target.value)} value={comment || ''}></textarea> */}
                                <textarea key={post._id} id={i} onChange={handleChange}></textarea>
                            <button data-mongo-id={post._id} onClick={handleSubmit}>Leave a Comment</button>
                            {/* {allComments.map(comment =>{<div>{comment.content}</div>})} */}

                            </div>)
                {nestedComments.map((comment,i) =>{
                    console.log(nestedComments)



                    })}
                    
                }
            )}

        </div>
    )
}

export default Posts