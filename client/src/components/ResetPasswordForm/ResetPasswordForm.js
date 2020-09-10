import React, {useState, useContext, useEffect} from 'react'
import AuthContext from '../../AuthContext'
import {finalizeResetPassword} from '../../actions'
import {withRouter} from 'react-router-dom'

const ResetPasswordForm = ({match}) => {
    const {state,dispatch} = useContext(AuthContext)
    const [password,setPassword] = useState('')
    const [msg,setMsg] = useState(false)

    let id;
    useEffect(()=>{
        console.log(match.params.id)
    },[])

    const divStyle = {
        margin:'8% 0 0 0'
    }
    const handleSubmit = e =>{
        e.preventDefault()
        id = match.params.id;
        console.log("id:")
        console.log(id)
        finalizeResetPassword(id,password,dispatch)
        setMsg(true)
    }

    return (
        <div style={divStyle}>
        {msg ? (<div><p>Your email has been reset, please click here to sign in</p></div>)
            :(
        <div>    
            <form>
            <p>Please reset your password here</p>
                <input type="hidden" name="id" value="' + payload.id + '" />
                <input type="hidden" name="token" value="' + req.params.token + '" />
                <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Reset your password" />
                <button type="submit" onClick={e => handleSubmit(e)}>Reset Password</button>
            </form>
        </div>
            )
        }
    </div>)
}

export default withRouter(ResetPasswordForm)