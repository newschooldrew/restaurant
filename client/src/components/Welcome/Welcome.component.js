import React, {useContext} from 'react'
import Context from '../../Context'
import {signOut} from '../../actions'
import {withRouter} from 'react-router-dom'

const Welcome = ({history}) => {
    const username = localStorage.getItem('username')

    const handleSubmit = () =>{
        signOut(history)
    }

    console.log(username)
    return (
        <div>
            welcome, {username}
            <button onClick={handleSubmit}>Sign Out</button>
        </div>
    )
}

export default withRouter(Welcome)
