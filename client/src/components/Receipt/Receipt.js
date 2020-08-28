import React, {useState,useEffect,useContext} from 'react'
import AuthContext from '../../AuthContext'
import {totalPrice,totalItemPrice} from '../../utils/cart.utils'
import { Table } from 'reactstrap';
import io from "socket.io-client";

const divStyle = {
    margin:'100px 0 0 0'
}


const Receipt = () => {
    const {state,dispatch} = useContext(AuthContext)
    let {username,profile,orderCount} = state;
    const cartItems = JSON.parse(sessionStorage.getItem('cart'))
    
    const [data,setData] = useState(null)
    const [endpoint,setEndpoint] = useState('http://localhost:5001')
    let socket = io(endpoint);

    const getData = item => {
        console.log("get Data ran");
        console.log(item)
        console.log(item.length)
        if(username == "alert_tester"){
            sessionStorage.setItem('orderCount',item.length)
        }
      };

    useEffect(()=>{
        let orderNotification;
        sessionStorage.removeItem('cart')
        sessionStorage.removeItem('cartTotal')
        socket.emit("initial_data",cartItems);
        socket.on("get_data", getData);
        

        // if(orderCountItems == null){
        //     socket.emit("initial_data",cartItems);
        //     socket.on("get_data", getData);
        //     sessionStorage.setItem('orderCount',1)
        //     orderNotification = [];
        //     let year = new Date().getFullYear()
        //     let month = new Date().getMonth()
        //     let date = new Date().getDate()
        //     let hours = new Date().getHours()
        //     let minutes = new Date().getMinutes()
        //     let time = new Date(year,month,date,hours,minutes)
        //     orderNotification.push({alert:"you have a new order",date:time})
            
        //     JSON.stringify(orderNotification)
        //     console.log("orderNotification:")
        //     console.log(typeof orderNotification)
        //     console.log(orderNotification)
        //     sessionStorage.setItem('orderNotification',JSON.stringify(orderNotification))
        // } else{
        //     JSON.parse(orderCountItems)
        //     orderCountItems++
        //     JSON.stringify(orderCountItems)
        //     sessionStorage.setItem('orderCount',orderCountItems++)
            
        //     orderNotification = JSON.parse(sessionStorage.getItem('orderNotification'))
        //     socket.emit("initial_data",cartItems);
        //     socket.on("get_data", getData);
        //     console.log("orderNotification:")
        //     console.log(typeof orderNotification)
        //     console.log(orderNotification[0])
        //     orderNotification.push({alert:"you have a new order",date:new Date()})
        //     JSON.stringify(orderNotification)
        //     sessionStorage.setItem('orderNotification',JSON.stringify(orderNotification))
        // }
        
    },[])

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
                        <tr key={idx}>
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
