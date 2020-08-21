import React, {useEffect} from 'react'
import {totalPrice,totalItemPrice} from '../../utils/cart.utils'
import { Table } from 'reactstrap';

const divStyle = {
    margin:'100px 0 0 0'
}


const Receipt = () => {
    const cartItems = JSON.parse(sessionStorage.getItem('cart'))
    console.log(cartItems)
    console.log(typeof cartItems)

    let unblock;

    window.addEventListener('beforeunload', function (e) {
        e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
        sessionStorage.removeItem('cart')
        sessionStorage.removeItem('cartTotal')
        // Cancel the event
        // Chrome requires returnValue to be set
      });

    return (<div style={divStyle}>
            <div>Your payment was processed</div>
            <Table responsive>
                <thead>
            <tr>
                <th className="text-center">Title</th>
                <th className="text-right">Cart</th>
                <th className="text-right">Quantity</th>
                <th className="text-right">Total</th>
            </tr>
            </thead>
            <tbody>
                {
                    cartItems.map((cart,idx) => {
                        console.log(cart.price)
                        return (
                        <tr>
                            <td className="text-center">{cart.title}</td>
                            <td className="text-center">{cart.price}</td>
                            <td className="text-center">{cart.quantity}</td>
                            <td className="text-center">{totalItemPrice(cart)}</td>
                        </tr>
                            )
                        })
                    }
                Total: {totalPrice(cartItems)}
            </tbody>
            </Table>
            </div>)
}

export default Receipt
