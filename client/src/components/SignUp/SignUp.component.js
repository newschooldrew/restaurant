import React, {useState, useContext} from 'react'
import {createUser} from '../../actions'
import AuthContext from '../../AuthContext'
import jwt from 'jsonwebtoken'
import {Link} from 'react-router-dom'

const SignUp = () => {
    const {state,dispatch} = useContext(AuthContext)
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [msg,setMsg] = useState('')
    
    const checkState = () =>{
        console.log(state.user)
    }

    const createToken = ({username,email, password},secret, expiresIn) =>{
        
        return jwt.sign({username,email, password},secret,{expiresIn})
    }
    
    let token;
    
    const handleSubmit = async e =>{
        e.preventDefault()

        token = createToken({username,email, password},'jk234sf98',"1hr")
        const user = {username,email, password,token}
        await createUser(user)
        console.log(localStorage.getItem("sign_up_msg"))
        if(localStorage.getItem("sign_up_msg")){
            setMsg("user already exists")
            
        } else{
            localStorage.setItem('username',username)
            localStorage.setItem('token',token)
            localStorage.removeItem('sign_up_msg')
        }
        dispatch({type:"CREATE_USER",payload:user})
        setUsername('')
        setEmail('')
        setPassword('')
    }

    return (
        <>
            <div>Sign Up</div>
            <div>{msg}</div>
            <form>
                <label>Username</label>
                    <input onChange={e => setUsername(e.target.value)} value={username} name="username" type="text" />
                <label>Email</label>
                    <input onChange={e => setEmail(e.target.value)} value={email} name="email" type="text" />
                <label>Password</label>
                    <input onChange={e => setPassword(e.target.value)} value={password} name="password" type="password" />
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={checkState}>Check State</button>
            </form>
            <div>Have an account? Click <Link to="/sign-in">Here</Link> </div>
        </>
    )
}

export default SignUp
