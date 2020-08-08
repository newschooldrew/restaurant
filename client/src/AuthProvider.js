import React, {useReducer, useEffect,useContext} from 'react'
import Reducer from './Reducer'
import AuthContext from './AuthContext'
import axios from 'axios'
import jwt from 'jsonwebtoken'

export const AuthProvider = (props) => {
    const INITIAL_STATE = useContext(AuthContext)
    const [state,dispatch] = useReducer(Reducer, INITIAL_STATE)
    console.log("state:")
    console.log(state)
    const {cartItems} = state;
    
    useEffect(()=>{
        const token = localStorage.getItem('token');
        let parsedRes = JSON.parse(sessionStorage.getItem('cart'))

        if(token){
            const decoded = jwt.verify(token,'jk234sf98',{ignoreExpiration:true})
            dispatch({type:"FETCH_USER",payload:decoded.username})
        } else{
            console.log("you must sign in")
        }
        
        console.log("cartItems:")
        console.log(cartItems)
        if(cartItems){
            // sessionStorage.setItem('cart',JSON.stringify(cartItems))
        }

        // dispatch({type:"UPDATE_CART",payload:parsedRes})
        
    },[cartItems])
    return(
        <AuthContext.Provider
            value={{state,dispatch}}
            {...props}
        />
    )
}
export default AuthProvider;