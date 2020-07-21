import React,{useContext,useEffect,useState} from 'react'
import AuthContext from '../../AuthContext'
import {updatePost} from '../../actions'

const EditPostModal = ({id,title,content,i}) => {

    const {state,dispatch} = useContext(AuthContext)
    const {username,hasUpdatedPost} = state;
    
    const [values,setValues] = useState({title,content,id})
    const [post_id, setId] = useState('')
    const [msg,setMsg] = useState('')

    useEffect(()=>{
        setMsg(hasUpdatedPost)
    },hasUpdatedPost)

    const handleChange = (event) => {
        const { name, value,id } = event.target;
        setValues({
          ...values,
          [name]: value,
        });
        setId(id)
        console.log(values)
      }

    const handleSubmit = async e =>{
        e.preventDefault()
        const {title,content} = values;
        const post = {title,content,username,id};
        await updatePost(post,dispatch)
    }
    return (
        <div>
                    <form>
                        {msg && (<div>{msg}</div>)}
                        <label>Title</label>
                            <input id={values._id} type="text" name="title" onChange={handleChange}  value={values.title || ""} />
                        <label>Content</label>
                            <textarea id={id} name="content" onChange={handleChange} value={values.content || ""}></textarea>
                        <button onClick={handleSubmit}>
                            Submit
                        </button>
                    </form>
        </div>
    )
}

export default EditPostModal
