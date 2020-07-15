import React,{useState, useEffect,useContext} from 'react'
import {createPost} from '../../actions'
import AuthContext from '../../AuthContext'

const CreatePost = () => {
    const {state} = useContext(AuthContext)
    useEffect(()=>{
        console.log("Create post is: ")
        console.log(state)

    },[state])

    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')

    const handleSubmit = e =>{
        e.preventDefault()
        const post = {title,content};
        createPost(post)
    }
    return (
        <form>
            <label>Title</label>
                <input type="text" name="title" onChange={e => setTitle(e.target.value)} value={title}/>
            <label>Content</label>
                <textarea name="content" onChange={e => setContent(e.target.value)} value={content}></textarea>
            <button onClick={handleSubmit}>
                Submit
            </button>
        </form>
    )
}

export default CreatePost
