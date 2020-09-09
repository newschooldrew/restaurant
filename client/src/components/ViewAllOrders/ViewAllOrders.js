import React, {useState, useContext, useEffect} from 'react'
import AuthContext from '../../AuthContext'
import {fetchUser,sendSms,sendDriver,fetchAllOrders} from '../../actions'
import CheckIcon from '@material-ui/icons/Check';

const ViewAllOrders = () => {
    const {state,dispatch} = useContext(AuthContext)
    const {username,profile,allOrders} = state;
    const [values,setValues] = useState({})
    
    if(profile){
        const {orders} = profile;
        console.log("profile:")
        console.log(profile)
        console.log("orders:")
        console.log(orders)
        orders.map(order=>{
            console.log("order")
            console.log(order)
            order.order.map(p =>{
                console.log("p:")
                console.log(p.title.toString())
            })
        })
    }

    useEffect(()=>{
        fetchAllOrders(dispatch)
    },[])
    
    useEffect(()=>{
        // fetchAllOrders(dispatch)
        console.log("allOrders:")
        console.log(state)
        console.log(allOrders)
    },[allOrders])



    const divStyle = {
        margin: '100px 0 0 0'
    }

    const handleConfirm = id =>{
        sendSms(id,username,dispatch)
        fetchUser(username,dispatch)
    }

    const handleSent = id =>{
        sendDriver(id,username,dispatch)
        fetchUser(username,dispatch)
    }

    return (
        <div style={divStyle}>
            {allOrders && allOrders.map(order =>{
                console.log("order:")
                console.log(order)
                const {_id} = order;
                return(
                    <div>
                        <div>{order.createdDate}</div>
                    {order.order.map(o=>{
                        console.log("o:")
                        console.log(o)
                        const title = o.title[0]
                        const price = o.price[0]
                        const quantity = o.quantity[0]
                        return(<>
                            <div>{title}</div>
                            <div>{price}</div>
                            <div>{quantity}</div>
                            </>
                            )
                        })}
                        {order.confirmed == false ?
                            (<button onClick={() => handleConfirm(_id)}>
                                confirm
                            </button>)
                            :(<button onClick={() => handleConfirm(_id)}>
                                <CheckIcon style={{ color: "green" }}/>confirmed
                            </button>)}
                            {order.sent == false ?
                        (<button onClick={() => handleSent(_id)}>
                            Click to notify buyer their food is on the way
                        </button>)
                        :(<button onClick={() => handleSent(_id)}>
                        <CheckIcon style={{ color: "green" }}/>Sent!
                    </button>)}
                </div>
                )
            })}
        </div>
        )
}

export default ViewAllOrders
