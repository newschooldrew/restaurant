import React, {useContext, useEffect, useState} from 'react'
import AuthContext from '../../AuthContext'
import {fetchPosts} from '../../actions'
import {withRouter} from 'react-router-dom'

const Welcome = ({history}) => {
    const {state,dispatch} = useContext(AuthContext)
    const {username,posts} = state;

    useEffect(() =>{
        fetchPosts(username,dispatch)
    },[username])

    return (
        <>
            <div>welcome page</div>
            <br />
            {posts && posts.map(post =>{
                
                return(<div key={post._id}>
                        <div>{post.title}</div>
                        <div>{post._id}</div>
                        <div>{post.content}</div>
                        <br />
                        <br />
                    </div>
                    )
            }
            )}
        </>
    )
}

export default withRouter(Welcome)
