import React,{useState, useEffect,useContext} from 'react'
import {createPost} from '../../actions'
import AuthContext from '../../AuthContext'

const CreatePost = () => {
    const {state} = useContext(AuthContext)
    const {username} = state;
    useEffect(()=>{
        console.log("Create post is: ")
        console.log(state)

    },[state])

    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [msg,setMsg] = useState('')

    const handleSubmit = async e =>{
        e.preventDefault()
        const post = {title,content,username};
        await createPost(post)
        setTitle('')
        setContent('')
        const success = localStorage.getItem('success')
        setMsg(success)
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
            <div>{msg}</div>
        </form>
    )
}

export default CreatePost
