import React, {useState, useContext} from 'react'
import {signInUser} from '../../actions'
import Context from '../../Context'
import {withRouter} from 'react-router-dom'

const SignIn = ({history}) => {
    const {state,dispatch} = useContext(Context)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    
    const checkState = () =>{
        console.log(state.user)
    }

    const handleSubmit = e =>{
        e.preventDefault()
        const user = {email, password}
        signInUser(user, history)
        dispatch({type:"SIGN_IN_USER",payload:user})
        setEmail('')
        setPassword('')
    }
    return (
        <>
            <div>Sign In</div>        
        <form>
            <label>Email</label>
                    <input onChange={e => setEmail(e.target.value)} value={email} name="email" type="text" />
                <label>Password</label>
                    <input onChange={e => setPassword(e.target.value)} value={password} name="password" type="password" />
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={checkState}>Check State</button>
            </form>
        </>
    )
}

export default withRouter(SignIn)
