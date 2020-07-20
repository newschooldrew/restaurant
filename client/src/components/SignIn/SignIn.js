import React, {useState, useContext, useEffect} from 'react'
import {signInUser} from '../../actions'
import AuthContext from '../../AuthContext'
import {withRouter} from 'react-router-dom'

const SignIn = ({history}) => {
    const {state,dispatch} = useContext(AuthContext)
    const [email,setEmail] = useState('')
    const [msg,setMsg] = useState('')
    const [password,setPassword] = useState('')
    
    useEffect(()=>{
        console.log(state)
    },[state])

    const checkState = () =>{
        console.log(state.user)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        localStorage.removeItem('sign_in_msg')
        const user = {email, password}
        signInUser(user, history)
             
        dispatch({type:"SIGN_IN_USER",payload:email})
        
        setEmail('')
        setPassword('')

        // error messages
        if(localStorage.getItem('sign_in_msg')){
            setMsg(localStorage.getItem('sign_in_msg'))
        } else{
            localStorage.removeItem('sign_in_msg')
        }        
    }
    return (
        <>
            <div>Sign In</div>        
        <form>
            <div>{msg}</div>
            <label>Email</label><br />
                    <input onChange={e => setEmail(e.target.value)} value={email} name="email" type="text" />
                    <br /><label>Password</label><br />
                    <input onChange={e => setPassword(e.target.value)} value={password} name="password" type="password" />
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={checkState}>Check State</button>
            </form>
        </>
    )
}

export default withRouter(SignIn)
