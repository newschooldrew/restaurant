import React, {useContext, useEffect, useState} from 'react'
import {fetchFavorites,increaseCommentLike,decreaseCommentLike} from '../../actions'
import AuthContext from '../../AuthContext'

const LikeComment = ({sub,comment_id,post_id,idx,liked}) => {
    const {state,dispatch,allPosts} = useContext(AuthContext)
    const {username,favorites,commentLiked,commentDisliked} = state;
    const [values,setValues] = useState({post_id,comment_id,[idx]:false})

    useEffect(()=>{
        console.log(liked)
        console.log(state)
        fetchFavorites(values.post_id,values.comment_id,username,dispatch)
    },[username,allPosts,commentLiked,commentDisliked])
    
    const handleCommentClick = e =>{
        const {id} = e.target;

        const prevLiked = favorites.findIndex(fav => fav == id) > -1;
        console.log("prevLiked:")
        console.log(prevLiked)
        if(prevLiked == true){
            console.log("previously liked")
            decreaseCommentLike(values.post_id,values.comment_id,username,dispatch)
        } else{
            console.log("not previously liked")
            increaseCommentLike(values.post_id,values.comment_id,username,dispatch)
        }
    }

    return (
        <div>
            {!liked ? (<button id={sub._id} onClick={e => handleCommentClick(e)}>Like Comment</button>) : (<button id={sub._id} onClick={handleCommentClick}>Unlike Comment</button>)}
        </div>
    )
}

export default LikeComment
