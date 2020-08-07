import React, {useContext, useEffect, useState} from 'react'
import AuthContext from '../../AuthContext'
import {fetchAllMeals,actionItemToCart,countAllItems} from '../../actions'
import {Link,withRouter} from 'react-router-dom'

const AllMeals = ({history}) => {
    const {state,dispatch} = useContext(AuthContext)
    const {username,allMeals,cartItems} = state;

    useEffect(() =>{
        fetchAllMeals(dispatch)
        console.log(cartItems)
        // countAllItems(cartItems,dispatch)
        console.log("cartItems:")
    },[cartItems])
    
    const addItemToCart = (id,title,price) =>{
        console.log(state)
        const item = {id,title,price};
        actionItemToCart(item,dispatch)
    }
    return (
        <>
            <div>AllMeals page</div>
            <br />
            <Link to="/create-post">Create A Post</Link>
            <br />
            {allMeals && allMeals.map(post =>{
                const id = post._id;
                const title = post.title;
                const price = post.price;
                return(<div key={post._id}>
                        <div>{post.title}</div>
                        <div>{post.description}</div>
                        <div>{post.price}</div>
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
