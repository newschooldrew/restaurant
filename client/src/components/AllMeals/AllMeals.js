import React, {useContext, useEffect, useState} from 'react'
import AuthContext from '../../AuthContext'
import {fetchAllMeals} from '../../actions'
import {Link,withRouter} from 'react-router-dom'

const AllMeals = ({history}) => {
    const {state,dispatch} = useContext(AuthContext)
    const {username,allMeals} = state;

    useEffect(() =>{
        fetchAllMeals(dispatch)
    },[username])

    return (
        <>
            <div>AllMeals page</div>
            <br />
            <Link to="/create-post">Create A Post</Link>
            <br />
            <Link to="/posts">Look at All Posts</Link>
            {allMeals && allMeals.map(post =>{
                
                return(<div key={post._id}>
                        <div>{post.title}</div>
                        <div>{post.description}</div>
                        <br />
                        <br />
                    </div>
                    )
            }
            )}
        </>
    )
}

export default withRouter(AllMeals)
