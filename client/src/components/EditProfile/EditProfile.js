import React,{useContext,useEffect} from 'react'
import AuthContext from '../../AuthContext'
import {fetchPosts} from '../../actions'
import {updatePost} from '../../actions'
import EditPostModal from '../EditRecipeModal/EditPostModal'

const EditProfile = () => {
    const {state,dispatch} = useContext(AuthContext)
    const {username,posts} = state;
    console.log("posts:")
    console.log(posts)

    useEffect(() =>{
        fetchPosts(username,dispatch)
        
    },[username])


    return (
        <div>
                {posts && posts.map((post,i) =>{
                    console.log(post[i])
                return(
                    <EditPostModal key={post._id} i={i} title={post.title} content={post.content} />
                )}
            )}
        </div>
    )
}

export default EditProfile

