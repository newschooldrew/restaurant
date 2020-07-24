import React, {useContext, useEffect, useState} from 'react'
import {fetchFavorites,increaseLike,decreaseLike} from '../../actions'
import AuthContext from '../../AuthContext'

const LikePost = ({id,idx}) => {
    const {state,dispatch} = useContext(AuthContext)
    const {username,favorites,allPosts,postLiked,postDisliked} = state;
    const [values,setValues] = useState({id})
    const [liked,setLiked] = useState(prevState => ({[idx]:prevState}))
    
    useEffect(()=>{
        fetchFavorites(username,dispatch).then(res => {
            const prevLiked = res.findIndex(fav => fav == id) > -1;
            console.log(prevLiked)
            setLiked({[idx]:prevLiked})
            console.log(liked)
        })
    },[username,allPosts,postLiked,postDisliked])
    
    const handleClick = async() => {
        console.log(liked)
        console.log(idx)
        console.log(favorites)
        const prevLiked = await favorites.findIndex(fav => fav == id) > -1;
        if(prevLiked == true){
            console.log("like decreased")
            await decreaseLike(id,username,dispatch)
            setLiked({[idx]:false})
            dispatch({type:"POST_DISLIKED",payload:true})
        } else{
            console.log("like increased")
            await increaseLike(id,username,dispatch)
            setLiked({[idx]:true})
            dispatch({type:"POST_LIKED",payload:true})
        }
        console.log(liked)
    }
        
    
    return (
        <div>
            {liked[idx] ? (<button onClick={handleClick}>Unlike Post</button>): (<button onClick={handleClick}>Like Post</button>)}
        </div>
    )
}

export default LikePost
