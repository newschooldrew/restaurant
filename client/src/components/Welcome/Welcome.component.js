import React, {useContext, useEffect, useState} from 'react'
import AuthContext from '../../AuthContext'
import {fetchPosts} from '../../actions'
import {Link,withRouter} from 'react-router-dom'

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
            <Link to="/create-post">Create A Post</Link>
            <br />
            <Link to="/posts">Look at All Posts</Link>
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
