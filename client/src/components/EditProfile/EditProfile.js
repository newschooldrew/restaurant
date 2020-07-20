import React,{useContext,useEffect,useState} from 'react'
import AuthContext from '../../AuthContext'
import {fetchPosts} from '../../actions'
import {updatePost} from '../../actions'

const EditProfile = () => {
    const {state,dispatch} = useContext(AuthContext)
    const {username,posts} = state;
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [post_id, setId] = useState('')
    const [title_key, setTitleKey] = useState('')
    const [content_key, setContentKey] = useState('')

    useEffect(() =>{
        fetchPosts(username,dispatch)
    },[username])

let newTitle,newContent;
    const handleChange = e => {
        setTitleKey(e.target.getAttribute('data-title-idx'))
        setContentKey(e.target.getAttribute('data-content-idx'))
        setId(e.target.id);
        
        setTitle({title_key:e.target.value});
        console.log(title_key)
        newTitle = title[title_key]
        console.log(newTitle)
        
        setContent({content_key:e.target.value});
        console.log(content_key)
        newContent = content[content_key]
        console.log(newContent)
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        const post = {title,content,username,post_id};
        await updatePost(post)
        setTitle('')
        setContent('')
    }

    return (
        <div>
                {posts && posts.map((post,i) =>{
                
                return(
                <div key={post._id}>
                    <form>
                        <label>Title</label>
                            <input data-title-idx={i} key={i} type="text" name="title" onChange={handleChange} />
                        <label>Content</label>
                            <textarea data-content-idx={i} id={post._id} name="content" onChange={handleChange} ></textarea>
                        <button onClick={handleSubmit}>
                            Submit
                        </button>
                    </form>
                </div>
                )}
            )}
        </div>
    )
}

export default EditProfile

