import React, {useEffect,useContext} from 'react'
import CartItem from '../CartItem/CartItem'
import AuthContext from '../../AuthContext'
import './AlertDropdown.scss'
import {withRouter} from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import {fetchAlerts} from '../../actions'

const AlertDropdown = ({alerts}) =>
{
    const {state,dispatch} = useContext(AuthContext)
    const {username} = state;
 
    useEffect(()=>{
        
        console.log("alerts:")
        console.log(alerts)
        console.log(state)
    },[])
    return(
    <div className='cart-dropdown'>
        <div />
        {
            alerts ? 
            alerts.map(cartItem =>{
                console.log(cartItem)
                return(<ul>
                    <li>{cartItem.alert} from {formatDistanceToNow(new Date(cartItem.date))} ago</li>
                </ul>)
            }) 
            :
            (<span className='empty-message'>No cart items</span>)
        }
        </div>
)}

export default withRouter(AlertDropdown)