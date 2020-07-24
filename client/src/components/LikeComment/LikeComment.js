import React, {useContext, useEffect, useState} from 'react'
import {fetchFavorites,increaseCommentLike,decreaseCommentLike} from '../../actions'
import AuthContext from '../../AuthContext'

const LikeComment = ({sub,comment_id,post_id,favorites}) => {
    const {state,dispatch,allPosts} = useContext(AuthContext)
    const {username,commentLiked,commentDisliked} = state;
    const [values,setValues] = useState({post_id,comment_id})
    const [liked,setLiked] = useState('')

    let prevLiked;
    useEffect(()=>{
        console.log(liked)
        console.log(state)
        
        const prevLiked = favorites.findIndex(fav => fav == comment_id) > -1;
        console.log("prevLiked:")
        console.log(prevLiked)
        setLiked(prevLiked)

    },[])
    
    const handleCommentClick = e =>{
        const {id} = e.target;

        if(liked == true){
            console.log("previously liked")
            decreaseCommentLike(values.post_id,values.comment_id,username,dispatch)
            setLiked(false)
        } else{
            console.log("not previously liked")
            increaseCommentLike(values.post_id,values.comment_id,username,dispatch)
            setLiked(true)
        }
    }

    return (
        <div>
            {!liked ? (<button id={sub._id} onClick={e => handleCommentClick(e)}>Like Comment</button>) : (<button id={sub._id} onClick={handleCommentClick}>Unlike Comment</button>)}
        </div>
    )
}

export default LikeComment
