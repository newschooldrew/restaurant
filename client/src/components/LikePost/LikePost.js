import React, {useContext, useEffect, useState} from 'react'
import {fetchFavorites,increaseCommentLike,decreaseCommentLike} from '../../actions'
import AuthContext from '../../AuthContext'

const LikePost = () => {
    const {state,dispatch,allPosts} = useContext(AuthContext)
    const {username,favorites,commentLiked,commentDisliked} = state;
    return (
        <div>
            <button onClick={() =>handleClick(post._id)}>Like Post</button>
        </div>
    )
}

export default LikePost
