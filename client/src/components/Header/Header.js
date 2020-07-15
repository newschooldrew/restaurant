import React,{useContext} from 'react'
import AuthContext from '../../AuthContext'
import {signOut} from '../../actions'
import {withRouter} from 'react-router-dom'

const Header = ({history}) => {
    const {state} = useContext(AuthContext)
    const {username} = state;
    console.log(username)

    const handleSubmit = () =>{
        signOut(history)
    }

    return (
        <div>
            Hello, {username}
            <button onClick={handleSubmit}>Sign Out</button>
        </div>
    )
}

export default withRouter(Header)
