import React, {useContext, useEffect} from 'react'
import AuthContext from '../../AuthContext'
import {signOut} from '../../actions'
import {withRouter} from 'react-router-dom'

const Welcome = ({history}) => {
    const {state} = useContext(AuthContext)
    const {username} = state;

    useEffect(()=>{
        console.log("welcome is: ")
        console.log(state.username)
    },[state])

    const handleSubmit = () =>{
        signOut(history)
    }

    console.log(username)
    return (
        <div>
        </div>
    )
}

export default withRouter(Welcome)
