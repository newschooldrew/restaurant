import React, {useState, useContext, useEffect} from 'react'
import AuthContext from '../../AuthContext'
import {fetchUser,sendSms,sendDriver} from '../../actions'
import CheckIcon from '@material-ui/icons/Check';

const ViewProfile = () => {
    const {state,dispatch} = useContext(AuthContext)
    const {username,profile} = state;
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
        fetchUser(username,dispatch)
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

    return (
        <div style={divStyle}>test
            {profile && 
                    profile.orders.map(order=>{
                        console.log("order:")
                        console.log(order)
                        const {_id} = order;
                        return(
                        <div>
                         <ul>
                        <li>{order.createdDate}
                        {order.order.map(p =>{
                            console.log("p:")
                            console.log(p)
                            const id = p._id
                            const title = p.title[0]
                            const price = p.price[0]
                            const quantity = p.quantity[0]
                            return(
                            <>
                                <div>{id}</div>
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
                        </li></ul></div>)
                    })
        }
        </div>
    )
}

export default ViewProfile
