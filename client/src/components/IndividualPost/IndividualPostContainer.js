import React, {lazy,useContext, useEffect, useState} from 'react'
import AuthContext from '../../AuthContext'
import {withRouter} from 'react-router-dom'
import {fetchSpecificPost} from '../../actions'
const IndividualPost = lazy(() => import('./IndividualPost'))

const IndividualPostContainer = ({match}) => {
    const {state,dispatch} = useContext(AuthContext)
    const {individualPost} = state;
    useEffect(()=>{
        const postId = match.params.postId;
        fetchSpecificPost(postId,dispatch)
    },[individualPost])
    
    if(!individualPost) return (<span>loading...</span>);

    return (
            <IndividualPost postInfo={individualPost}/>
    )
}

export default IndividualPostContainer
