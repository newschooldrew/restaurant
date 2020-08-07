import React,{useContext,useEffect} from 'react'
import AuthContext from '../../AuthContext'
import {signOut} from '../../actions'
import {withRouter} from 'react-router-dom'

const Header = ({history}) => {
    const {state,dispatch} = useContext(AuthContext)
    // const {username} = state;
    const {username,cartItems,cartTotal} = state;
    let newTotal;
    
    const handleSubmit = () =>{
        signOut(history)
        dispatch({type:"LOG_OUT",payload:null})
    }

    if(cartItems){
        newTotal = cartItems.reduce((acc,cartItem) => acc + cartItem.quantity,0)
        localStorage.setItem('cartTotal',newTotal)
    }
    const myTotal = localStorage.getItem("cartTotal")
    
    return (
     <div>  
         <div>Cart Items: {myTotal}</div> 
     {username ?
        <div>
            Hello, {username}
            <button onClick={handleSubmit}>Sign Out</button>
        </div> 
    : <div>Please log in</div>}
    </div>
    )        
}

export default withRouter(Header)
