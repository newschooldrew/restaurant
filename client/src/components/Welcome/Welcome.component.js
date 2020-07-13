import React, {useContext} from 'react'
import Context from '../../Context'
import {withRouter} from 'react-router-dom'

const Welcome = ({history}) => {
    const username = localStorage.getItem('username')

    const signOut = () =>{
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        history.push('/')
    }

    console.log(username)
    return (
        <div>
            welcome, {username}
            <button onClick={signOut}>Sign Out</button>
        </div>
    )
}

export default withRouter(Welcome)
