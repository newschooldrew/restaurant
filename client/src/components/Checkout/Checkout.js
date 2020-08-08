import React, {useEffect,useContext} from 'react'
import AuthContext from '../../AuthContext'
import {Link} from 'react-router-dom'

const Checkout = () => {
    const {state,dispatch} = useContext(AuthContext)
    const {username,cartItems} = state;
    let sessionItems = JSON.parse(sessionStorage.getItem('cart'))

    console.log("cartItems:")
    console.log(cartItems.length)
    console.log(sessionItems)
    console.log(cartItems)
    if(!cartItems) return (<div>loading checkout items</div>)
    if(!cartItems) return false
    return(
        <div>
        <Link to="/all-meals">All Meals</Link>
        {cartItems.length > 0 ? cartItems.map(item =>{
            return(
                <div>
                    <div>{item.title}</div>
                    {/* <div>{item.description}</div> */}
                    <div>{item.price}</div>
                    <div>{item.quantity}</div>
                </div>)
                }
            ) : sessionItems.map(item =>{
                return(
                    <div>
                        <div>{item.title}</div>
                        {/* <div>{item.description}</div> */}
                        <div>{item.price}</div>
                        <div>{item.quantity}</div>
                    </div>)
                    }
                )}
        </div>
    )
}

export default Checkout
