import React, {useEffect,useContext} from 'react'
import CartItem from '../CartItem/CartItem'
import AuthContext from '../../AuthContext'
import { formatDistanceToNow } from 'date-fns'
import {fetchOrderFromAlert,sendSms,fetchUser,sendDriver} from '../../actions'
import CheckIcon from '@material-ui/icons/Check';
import io from "socket.io-client";
import {socket} from '../Header/Header'

const ConfirmOrder = ({match}) => {
    const {state,dispatch} = useContext(AuthContext)
    const {username,fetchedOrderFromAlert} = state;
    const id = match.params.id;

    useEffect(()=>{
        const id = match.params.id;
        fetchOrderFromAlert(id,dispatch)
    },[id])


    const getData = item => {
        console.log("get Data ran");
        console.log(item)
        dispatch({type:"FETCH_ORDER_FROM_ALERT",payload:item})
      };

    const handleConfirm = id =>{
        sendSms(id,username,dispatch)
    }

    const handleSent = id =>{
        sendDriver(id,username,dispatch)
    }

    const divStyle = {
        margin:'100px 0 0 0'
    }

    return (
        <div style={divStyle}>
            {fetchedOrderFromAlert ?
            (<div key={match.params.id}>
                {fetchedOrderFromAlert.createdDate}
                 {fetchedOrderFromAlert.order.map(fetched =>{
                     console.log("fetched:")
                     console.log(fetched)
                return(<>
                     <div>{fetched.title}</div>
                     <div>{fetched.price}</div>
                     <div>{fetched.quantity}</div>
                     </>)
                 })}
                      {fetchedOrderFromAlert.confirmed == false ?
                            (<button onClick={() => handleConfirm(fetchedOrderFromAlert._id)}>
                                confirm
                            </button>)
                            :(<button onClick={() => handleConfirm(fetchedOrderFromAlert._id)}>
                                <CheckIcon style={{ color: "green" }}/>confirmed
                            </button>)}
                        
                        {fetchedOrderFromAlert.sent == false ?
                        (<button disabled={fetchedOrderFromAlert.confirmed == false} onClick={() => handleSent(fetchedOrderFromAlert._id)}>
                            Click to notify buyer their food is on the way
                        </button>)
                        :(<button onClick={() => handleSent(fetchedOrderFromAlert._id)}>
                        <CheckIcon style={{ color: "green" }}/>Sent!
                    </button>)}

            </div>):null}
        </div>
    )
}

export default ConfirmOrder