import React, { useState , useContext} from 'react'
import AuthContext from '../../AuthContext'
import {resetPassword} from '../../actions'
import {
    Button,
    Form,
    Input
  } from "reactstrap";

const ForgotPassword = () => {
    const {state,dispatch} = useContext(AuthContext)
    const {showURL} = state;
    const [username, setUsername] = useState('')
    const [msg, setMsg] = useState('')

    const handleChange = value => {
        console.log("value")
        console.log(value)
        setUsername(value)
    }

    const handleSubmit = e =>{
        e.preventDefault()
        resetPassword(username,dispatch)
        setMsg('An email has been sent to your inbox')
    }

    const divStyle = {
        margin:'8% 0 0 0'
    }
    return (
        <div style={divStyle}>
            <Form>
                <p>Enter your email address to get a password reset link sent to your inbox</p>
                <Input type="username" name="username" onChange={ e => handleChange(e.target.value)} placeholder="Enter your email address..." />
                <Button type="submit" onClick={e => handleSubmit(e)}>Reset Password</Button>
                <p>{msg}</p>
            </Form>      
            {showURL && (<a href={showURL}>Reset Password</a>)}
        </div>
    )
}

export default ForgotPassword
