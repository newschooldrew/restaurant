import React,{useContext,useEffect,useState} from 'react'
import AuthContext from '../../AuthContext'
import {updatePost} from '../../actions'

const EditPostModal = ({email,password,profileName,id}) => {

    const {state,dispatch} = useContext(AuthContext)
    const {username,hasUpdatedPost} = state;
    
    const [values,setValues] = useState({email,profileName,password,id})
    const [msg,setMsg] = useState('')

    useEffect(()=>{
        setMsg(hasUpdatedPost)
        console.log(values)
    },[hasUpdatedPost])

    const divStyle = {
        margin:'8% 0 0 0'
    }

    const handleChange = (event) => {
        const { name, value} = event.target;
        setValues({
          ...values,
          [name]: value,
        });
        // setId(id)
        console.log(values)
      }

    const handleSubmit = async e =>{
        e.preventDefault()
        const {title,content} = values;
        const post = {email,username:profileName};
        await updatePost(post,dispatch)
    }
    return (
        <div style={divStyle}>
                    <form>
                        {msg && (<div>{msg}</div>)}
                        <label>Email</label>
                            <input id={id} type="text" name="email" onChange={handleChange}  value={values.email || ""} />
                        <label>Username</label>
                            <input id={id} type="text" name="username" onChange={handleChange}  value={values.profileName || ""} />
                        {/* <label>Content</label>
                            <textarea id={id} name="content" onChange={handleChange} value={values.content || ""}></textarea> */}
                        <button onClick={handleSubmit}>
                            Submit
                        </button>
                    </form>
        </div>
    )
}

export default EditPostModal
