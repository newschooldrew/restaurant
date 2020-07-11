import React, {useState, useContext} from 'react'
import {createUser} from '../../actions'
import Context from '../../Context'

const SignUp = () => {
    const {dispatch} = useContext(Context)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    
    const handleSubmit = e =>{
        e.preventDefault()
        const user = {email, password}
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
            </form>
    )
}

export default SignUp
