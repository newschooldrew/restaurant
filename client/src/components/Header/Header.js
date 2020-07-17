import React,{useContext} from 'react'
import AuthContext from '../../AuthContext'
import {signOut} from '../../actions'
import {withRouter} from 'react-router-dom'

const Header = ({history}) => {
    const {state,dispatch} = useContext(AuthContext)
    const {username} = state;
    console.log(username)

    const handleSubmit = () =>{
        signOut(history)
        dispatch({type:"LOG_OUT",payload:null})
    }

    return (
     <>   
     {username ?
        <div>
            Hello, {username}
            <button onClick={handleSubmit}>Sign Out</button>
        </div> 
    : <div>Please log in</div>}
    </>
    )        
}

export default withRouter(Header)
