import React, {useContext, useEffect, useState} from 'react'
import {increaseLike,decreaseLike} from '../../actions'
import AuthContext from '../../AuthContext'

const LikePost = ({id,favorites}) => {
    const {state,dispatch} = useContext(AuthContext)
    const {username,allPosts} = state;
    const [values,setValues] = useState({id})
    const [liked,setLiked] = useState('')
    let prevLiked;
    useEffect(()=>{
        if(!favorites) return (<span>loading post favorites ...</span>);
            const prevLiked = favorites.findIndex(fav => fav == id) > -1;
            console.log(prevLiked)
            setLiked(prevLiked)
            console.log(liked)
    },[])
    
    const handleClick = () => {
        if(liked == true){
            console.log("like decreased")
            decreaseLike(id,username,dispatch)
            setLiked(false)
            dispatch({type:"POST_DISLIKED",payload:true})
        } else{
            console.log("like increased")
            increaseLike(id,username,dispatch)
            setLiked(true)
            dispatch({type:"POST_LIKED",payload:true})
        }
    }
        
    return (
        <div>
            {liked ? (<button onClick={handleClick}>Unlike Post</button>): (<button onClick={handleClick}>Like Post</button>)}
        </div>
    )
}

export default LikePost
