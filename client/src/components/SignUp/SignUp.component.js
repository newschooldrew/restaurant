import React, {useState, useContext} from 'react'
import {createUser} from '../../actions'
import Context from '../../Context'
import jwt from 'jsonwebtoken'

const SignUp = () => {
    const {state,dispatch} = useContext(Context)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    
    const checkState = () =>{
        console.log(state.user)
    }

    const createToken = ({email, password},secret, expiresIn) =>{
        
        return jwt.sign({email, password},secret,{expiresIn})
    }
    
    let token;
    
    const handleSubmit = e =>{
        e.preventDefault()
        token = createToken({email, password},'jk234sf98',"1hr")
        const user = {email, password,token}
        localStorage.setItem('token',token)
        createUser(user)
        
        dispatch({type:"CREATE_USER",payload:user})
        setEmail('')
        setPassword('')
    }

    return (
            <form>
                <label>Email</label>
                    <input onChange={e => setEmail(e.target.value)} value={email} name="email" type="text" />
                <label>Password</label>
                    <input onChange={e => setPassword(e.target.value)} value={password} name="password" type="password" />
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={checkState}>Check State</button>
            </form>
    )
}

export default SignUp
