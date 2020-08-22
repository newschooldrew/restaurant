  
import React from 'react';

import './CartItem.scss'

const CartItem = ({item}) => {
    const {title,price, quantity} = item;
    return (
    <div className='cart-item'>
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/1200px-Los_Angeles_Lakers_logo.svg.png' alt='item' />
        <div className='item-details'>
            <span className='name'>{title}</span>
            <span className='price'>
                {quantity} x ${price}
            </span>
        </div>
    </div>
)}

export default CartItem;