import React, {useEffect,useContext} from 'react'
import './AlertDropdown.scss'
import {Link,withRouter} from 'react-router-dom'
import {updateReadOnAlert} from '../../actions'
import { formatDistanceToNow } from 'date-fns'

const AlertDropdown = ({history,alerts}) =>
{
    const handleClick = id => {
        console.log("alert dropdown id:")
        console.log(id._id)
        updateReadOnAlert(id._id)
        history.push(`/confirm-order/${id._id}`)
    }

    return(
    <div className='cart-dropdown'>
        <div />
        {
            alerts ? 
            alerts.map(cartItem =>{
                console.log(cartItem)
                const {_id} = cartItem;
                return(<ul key={cartItem._id}>
                            <Link>
                                <li onClick={() => handleClick({_id})}>{cartItem.alert} from {formatDistanceToNow(new Date(cartItem.createdDate))} ago
                                </li>
                            </Link>
                       </ul>)
            }) 
            :
            (<span className='empty-message'>No cart items</span>)
        }
        <button onClick={()=> history.push('/view-all-orders')}>View All Orders</button>
        </div>
)}

export default withRouter(AlertDropdown)