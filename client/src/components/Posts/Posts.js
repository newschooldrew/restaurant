import React, {useContext, useEffect, useState} from 'react'
import AuthContext from '../../AuthContext'
import {Link} from 'react-router-dom'
import {fetchAllPosts,postComment, fetchFavorites} from '../../actions'
import update from 'react-addons-update'
import EditComment from '../EditComment/EditComment'
import LikeComment from '../LikeComment/LikeComment'
import LikePost from '../LikePost/LikePost'

const Posts = ({match}) => {
    const {state,dispatch} = useContext(AuthContext)
    const {username,allPosts,newComment,editMode,commentLiked,postLiked,postDisliked,favorites} = state;
    const [comment, setComment] = useState({})
    const [comment_id, setId] = useState('')
    const [edit_id, setEditId] = useState('')
    const [edit_flag, setEditFlag] = useState(false)
    const [key, setKey] = useState('')
    
    console.log("state:")
    console.log(state)
    console.log("allPosts:")
    console.log(allPosts)
    console.log("newComment:")
    console.log(newComment)

    useEffect(() =>{
        fetchAllPosts(username,dispatch)
        fetchFavorites(username,dispatch)
    },[username,editMode,newComment,commentLiked,postLiked,postDisliked])

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

    if(!favorites) return (<span>loading...</span>);

    return (
        <div>
            {allPosts && allPosts.map((post,idx) => {
                console.log("****************")
                console.log("comparison:")
                return(
                <div>
                
                <br />
                                <div>{post._id}</div>
                                <Link to={`${match.url}/${post._id}`}>{post.title}</Link>
                                <div>{post.content}</div>
                                <div>Written by:{post.username}</div>
                                <div>Likes:{post.likes}</div>
                                    <LikePost id={post._id} idx={idx} user={post.username}/>
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
                                <textarea key={post._id} id={idx} onChange={handleChange}></textarea>
                            <button data-mongo-id={post._id} onClick={handleSubmit}>Leave a Comment</button>
                            </div>)                    
                }
            )}

        </div>
    )
}

export default Posts