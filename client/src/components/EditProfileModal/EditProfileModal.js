import React,{useContext,useEffect,useState} from 'react'
import AuthContext from '../../AuthContext'
import {updateProfile} from '../../actions'

const EditProfileModal = ({id,profileName,email,password,phoneNumber}) => {

    const {state,dispatch} = useContext(AuthContext)
    const {hasUpdatedPost} = state;
    
    const [values,setValues] = useState({id,profileName,email,password,phoneNumber})
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
        const {id,profileName,emails,password,phoneNumber} = values;
        await updateProfile(values,dispatch)
    }
    return (
        <div style={divStyle}>
                    <form>
                        {msg && (<div>{msg}</div>)}
                        <label>username</label>
                            <input type="text" name="profileName" onChange={handleChange}  value={values.profileName || ""} />
                        <label>email</label>
                            <input type="text" name="email" onChange={handleChange}  value={values.email || ""} />
                        <label>password</label>
                            <input name="password" onChange={handleChange} value={values.password || ""} />
                        <label>phoneNumber</label>
                            <input name="phoneNumber" onChange={handleChange} value={values.phoneNumber || ""} />
                        <button onClick={handleSubmit}>
                            Submit
                        </button>
                    </form>
        </div>
    )
}

export default EditProfileModal