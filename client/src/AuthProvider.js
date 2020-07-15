import React, {useReducer, useEffect} from 'react'
import Reducer from './Reducer'
import AuthContext from './AuthContext'
import axios from 'axios'
import jwt from 'jsonwebtoken'

export const AuthProvider = (props) => {
    const [state,dispatch] = useReducer(Reducer, AuthContext)

    
    useEffect(()=>{
        const token = localStorage.getItem('token');
        const decoded = jwt.verify(token,'jk234sf98')
        dispatch({type:"FETCH_USER",payload:decoded.username})
    },[])
    return(
        <AuthContext.Provider
            value={{state,dispatch}}
            {...props}
        />
    )
}
export default AuthProvider;