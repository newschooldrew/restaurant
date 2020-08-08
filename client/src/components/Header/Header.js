import React,{useContext,useEffect} from 'react'
import AuthContext from '../../AuthContext'
import {signOut} from '../../actions'
import {withRouter} from 'react-router-dom'

const Header = ({history}) => {
    const {state,dispatch} = useContext(AuthContext)
    // const {username} = state;
    const {username,cartItems} = state;
    let cartItemCount = sessionStorage.getItem('cartTotal')
    let newTotal;

    const handleSubmit = () =>{
        signOut(history)
        dispatch({type:"LOG_OUT",payload:null})
    }

    console.log("cartItems")
    console.log(cartItems)
    console.log(typeof cartItems)

    let mySession;
   
    useEffect(() =>{        
        mySession = sessionStorage.getItem('cart')
        console.log("mySession:")
        console.log(mySession)
        // sessionStorage.getItem('cart')
    },[])

    // useEffect(() =>{        
    //     mySession = sessionStorage.getItem('cart')
    //     console.log("mySession:")
    //     console.log(mySession)
    //     sessionStorage.setItem('cart',JSON.stringify(cartItems))
    //     console.log("cart:")
    // },[cartItems])

    if(cartItems.length > 0){
        try{
            sessionStorage.setItem('cart',JSON.stringify(cartItems))
        newTotal = cartItems.reduce((acc,cartItem) => acc + cartItem.quantity,0)
        sessionStorage.setItem('cartTotal',newTotal)
        } catch(e){
            console.log("cartItems is empty")
        }
    }
    
    return (
     <div>  
         <div>Cart Items: {cartItemCount}</div> 
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
