import React,{useContext,useEffect,useState} from 'react'
import AuthContext from '../../AuthContext'
import {updateProfile} from '../../actions'
import {
    Form,
    FormGroup,
    Input,
    Button
  } from "reactstrap";

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
        margin:'15%'
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
                    <Form>
                        {msg && (<div>{msg}</div>)}
            <div className="form-row">
                    <FormGroup className="col-md-6">
                        <label htmlFor="username">username</label>
                            <Input type="text" name="profileName" onChange={handleChange}  value={values.profileName || ""} />
                    </FormGroup>
                    <FormGroup className="col-md-6">
                        <label>email</label>
                            <Input type="text" name="email" onChange={handleChange}  value={values.email || ""} />
                    </FormGroup>
            </div>
            <div className="form-row">
                    <FormGroup className="col-md-6">
                        <label>password</label>
                            <Input name="password" onChange={handleChange} value={values.password || ""} />
                    </FormGroup>
                    <FormGroup className="col-md-6">
                        <label>phoneNumber</label>
                            <Input name="phoneNumber" onChange={handleChange} value={values.phoneNumber || ""} />
                    </FormGroup>
            </div>
                        <FormGroup>
                            <Button onClick={handleSubmit}>
                                Submit
                            </Button>
                        </FormGroup>
                    </Form>
        </div>
    )
}

export default EditProfileModal