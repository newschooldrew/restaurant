import React, {useContext, useEffect, useState} from 'react'
import AuthContext from '../../AuthContext'
import {withRouter} from 'react-router-dom'
import LikePost from '../LikePost/LikePost'
import EditComment from '../EditComment/EditComment'
import LikeComment from '../LikeComment/LikeComment'
import {fetchAllPosts,postComment, fetchFavorites} from '../../actions'
import update from 'react-addons-update'

const IndividualPost = ({postInfo}) => {
    const {state,dispatch} = useContext(AuthContext)
    const {username,allPosts,newComment,editMode,commentLiked,postLiked,postDisliked,favorites} = state;
    
    const [comment, setComment] = useState({})
    const [comment_id, setId] = useState('')
    const [edit_id, setEditId] = useState('')
    const [edit_flag, setEditFlag] = useState(false)
    const [key, setKey] = useState('')
    console.log("postInfo:")
    console.log(postInfo)

    useEffect(()=>{
        fetchFavorites(username,dispatch)
    },[])

    const formatDate = date =>{
        const newDate = new Date(date).toLocaleDateString('en-US');
        const newTime = new Date(date).toLocaleTimeString('en-US')
        return `${newDate} at ${newTime}`
    }
    let new_comment;

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
    if(!favorites) return (<span>loading favorites ...</span>);
    return (
        <div>
                                <div>{postInfo.content}</div>
                                <div>Written by:{postInfo.username}</div>
                                <div>Likes:{postInfo.likes}</div>
                                    <LikePost id={postInfo._id} user={postInfo.username}/>
                                    {/* idx={idx}  */}
                                <br />
                                <ul>
                                {postInfo.comments.map((sub,idx) =>
                                    <li>
                                        {sub.commenter == username ? (<a role="button" onClick={e => editComment({sub})}>edit</a>):null}
                                        {editMode && edit_id === sub._id ? (<EditComment id={edit_id} edit_flag={edit_flag} post_id={postInfo._id}content={sub.content} />) :(<div>{sub.content}</div> )}
                                        <div>by: {sub.commenter}</div>
                                        <div>by: {sub._id}</div>
                                        <div>Date posted: {formatDate(sub.createdDate)}</div>
                                        <div>Comment likes: {sub.likes}</div>
                                        <LikeComment comment_id={sub._id} idx={idx} favorites={favorites} liked={sub.hasBeenLiked} post_id={postInfo._id} sub={sub}/>
                                        <br />
                                    </li>
                                    )}
                                </ul>
                                <textarea key={postInfo._id} onChange={handleChange}></textarea>
                            <button data-mongo-id={postInfo._id} onClick={handleSubmit}>Leave a Comment</button>
                            </div> 
    )
}

export default withRouter(IndividualPost)
