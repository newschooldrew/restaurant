import React, {useContext, useEffect, useState} from 'react'
import AuthContext from '../../AuthContext'
import {fetchAllMeals,actionItemToCart,countAllItems} from '../../actions'
import {Link,withRouter} from 'react-router-dom'

const AllMeals = ({history}) => {
    let myCachedSession = sessionStorage.getItem('cart')
    let itemsArr = [];
    const {state,dispatch} = useContext(AuthContext)
    const {username,allMeals,cartItems,cart} = state;
    
    useEffect(() =>{
        fetchAllMeals(dispatch)

    },[])
    
    const addItemToCart = (id,title,price) =>{
        console.log(state)
        const item = {id,title,price};
        dispatch({type:"ADD_ITEM_TO_CART",payload:item})
    }
    const removeItemFromCart = (id,title,price) =>{
        console.log(state)
        const item = {id,title,price};
        dispatch({type:"REMOVE_ITEM_FROM_CART",payload:item})
    }
    return (
        <>
            <div>AllMeals page</div>
            <br />
            <Link to="/checkout">Checkout</Link>
            <br />
            {allMeals && allMeals.map(post =>{
                const id = post._id;
                const title = post.title;
                const price = post.price;
                return(<div key={post._id}>
                        <div>{post.title}</div>
                        <div>{post.description}</div>
                        <div>{post.price}</div>
                        <button onClick={() => removeItemFromCart(id,title,price)}>Remove From Cart</button>
                        <button onClick={() => addItemToCart(id,title,price)}>Add To Cart</button>
                        <br />
                        <br />
                    </div>
                    )
            }
            )}
        </>
    )
}

export default withRouter(AllMeals)
