import React, {useState, useContext, useEffect} from 'react'
import AuthContext from '../../AuthContext'
import {fetchUser,sendSms,sendDriver,fetchOrderWithId} from '../../actions'
import { Button, Table, UncontrolledTooltip } from "reactstrap";

const ViewProfile = () => {
    const {state,dispatch} = useContext(AuthContext)
    const {username,profile,allOrders,individualOrders} = state;
    console.log("individualOrders:")
    console.log(individualOrders)
    const [values,setValues] = useState({})
    // if(profile){
    //     const {orders} = profile;
    //     console.log("profile:")
    //     console.log(profile)
    //     console.log("orders:")
    //     console.log(orders)
    //     orders.map(order=>{
    //         console.log("order")
    //         console.log(order)
    //         order.map(p =>{
    //             console.log("p:")
    //             console.log(p.title.toString())
    //         })
    //     })
    // }

    useEffect(()=>{
        fetchUser(username,dispatch)
        fetchOrderWithId(username,dispatch)
    },[username])

    const divStyle = {
        margin: '100px 0 0 0'
    }

    const handleConfirm = id =>{
        sendSms(id,username)
        fetchUser(username,dispatch)
    }

    const handleSent = id =>{
        sendDriver(id,username)
        fetchUser(username,dispatch)
    }

    const orderStyle = {
        margin:'7% 0 7% 0',
        textAlign:'center'
    }

    return (
        <div style={divStyle}>
            {profile && (
                <>
                <h3 style={orderStyle}><strong>Your Profile</strong></h3>
                <Table>
                    <thead>
                        <tr>
                            <th>Joined Date</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th className="text-right">Phone Number</th>
                        </tr>
                    </thead>
                    <tr>
                        <td>{profile.joinedDate}</td>
                        <td>{profile.email}</td>
                        <td>{profile.username}</td>
                        <td>{profile.phoneNumber}</td>
                    </tr>
                </Table>
                </>)
            }

            <h3 style={orderStyle}><strong>Your Orders</strong></h3>
            <hr />
                     {allOrders && allOrders.map(order=>{
                        const {_id} = order;
                        console.log("order:")
                        console.log(order)
                        
                        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                        
                        let isoformat = order.createdDate
                        let readable = new Date(isoformat);
                        let m = readable.getMonth();
                        let d = readable.getDay();
                        let y = readable.getFullYear();
                        let mlong = months[m];
                        let fulldate = mlong + " " + d + ", " + y;
                            return(
                                    <div>
                                    Created {fulldate}
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>IDs</th>
                                                <th>Title</th>
                                                <th>Price</th>
                                                <th className="text-right">Quantity</th>
                                            </tr>
                                        </thead>
                                        {order.order.map((p,idx) =>{
                                            const id = p._id
                                            const title = p.title[0]
                                            const price = p.price[0]
                                            const quantity = p.quantity[0]
                                            return(
                                                <>
                                                    <tr>
                                                        <td>{id}</td>
                                                        <td>{title}</td>
                                                        <td>{price}</td>
                                                        <td>{quantity}</td>
                                                    </tr>
                                                </>
                                            )
                                        })}
                                    </Table>
                                </div>
                            )
                    })}
            </div>
    )
}

export default ViewProfile
