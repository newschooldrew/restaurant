import React, {useContext, useEffect, useState} from 'react'
import AuthContext from '../../AuthContext'
import {fetchAllPosts,postComment, increaseLike,decreaseLike,increaseCommentLike,decreaseCommentLike} from '../../actions'
import update from 'react-addons-update'
import EditComment from '../EditComment/EditComment'
import LikeComment from '../LikeComment/LikeComment'

const Posts = () => {
    const {state,dispatch} = useContext(AuthContext)
    const {username,allPosts,newComment,editMode,commentLiked} = state;
    const [comment, setComment] = useState({})
    const [comment_id, setId] = useState('')
    const [edit_id, setEditId] = useState('')
    const [edit_flag, setEditFlag] = useState(false)
    const[likedState,setLikedState] = useState(false)
    const [key, setKey] = useState('')
    
    console.log("state:")
    console.log(state)
    console.log("allPosts:")
    console.log(allPosts)
    console.log("newComment:")
    console.log(newComment)

    useEffect(() =>{
        fetchAllPosts(username,dispatch)
        console.log(allPosts)
    },[username,editMode,likedState,newComment,commentLiked])

    let new_comment;

    const formatDate = date =>{
        const newDate = new Date(date).toLocaleDateString('en-US');
        const newTime = new Date(date).toLocaleTimeString('en-US')
        return `${newDate} at ${newTime}`
    }

    const editComment = info =>{
        console.log("info:")
        console.log(info.sub._id)
        console.log("Edit hit")
        setEditId(info.sub._id)
        dispatch({type:"TOGGLE_EDIT_MODE",payload:editMode})
    }

    const handleClick = id =>{
        console.log("like post hit")
        setLikedState(!likedState)
        console.log(likedState)
        handleLike(increaseLike,decreaseLike,id)
        // dispatch({type:"POST_LIKED",payload:true})
    }

    const handleLike = async (increaseFunction,decreaseFunction,id) =>{
        if(!likedState){
            console.log("increase function hit")
            await increaseFunction(id)
        } else{
            console.log("decrease function hit")
            await decreaseFunction(id)
        }
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

                console.log("****************")
                console.log("comparison:")

                return(
                <div>
                
                <br />
                                <div>{post._id}</div>
                                <div>{post.title}</div>
                                <div>{post.content}</div>
                                <div>Written by:{post.username}</div>
                                <div>Likes:{post.likes}</div>
                                <button onClick={() =>handleClick(post._id)}>Like Post</button>
                                <br />
                                <ul>
                                {post.comments.map((sub,idx) =>
                                    <li>
                                        {sub.commenter == username ? (<a role="button" onClick={e => editComment({sub})}>edit</a>):null}
                                        {editMode && edit_id === sub._id ? (<EditComment id={edit_id} edit_flag={edit_flag} post_id={post._id}content={sub.content} />) :(<div>{sub.content}</div> )}
                                        <div>by: {sub.commenter}</div>
                                        <div>by: {sub._id}</div>
                                        <div>Date posted: {formatDate(sub.createdDate)}</div>
                                        <div>Comment likes: {sub.likes}</div>
                                        <LikeComment comment_id={sub._id} idx={idx} favorites={state.favorites} liked={sub.hasBeenLiked} post_id={post._id} sub={sub}/>
                                        <br />
                                    </li>
                                    )}
                                </ul>
                                <textarea key={post._id} id={i} onChange={handleChange}></textarea>
                            <button data-mongo-id={post._id} onClick={handleSubmit}>Leave a Comment</button>
                            </div>)                    
                }
            )}

        </div>
    )
}

export default Posts