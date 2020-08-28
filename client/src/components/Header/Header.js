import React,{useState,useContext,useEffect} from 'react'
import AuthContext from '../../AuthContext'
import AppBar from "@material-ui/core/AppBar";
import {signOut,fetchAlerts} from '../../actions'
import {withRouter} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CartDropdown from '../CartDropdown/CartDropdown'
import AlertDropdown from '../AlertDropdown/AlertDropdown'
import NotifyMe from 'react-notification-timeline';
import { useToasts } from 'react-toast-notifications'
import io from "socket.io-client";

const Header = () => {
    const {state,dispatch} = useContext(AuthContext)
    const {username,cartItems,toggleCart,toggleAlertDropDown,alerts} = state;
    const { addToast } = useToasts()
    let cartAlerts = JSON.parse(sessionStorage.getItem('orderNotification'))
    let cartItemCount = sessionStorage.getItem('cartTotal')
    let orderCountItems = sessionStorage.getItem('orderCount')
    let sessionCartItems = JSON.parse(sessionStorage.getItem('cart'))
    const [endpoint,setEndpoint] = useState('http://localhost:5001')
    let socket = io(endpoint);
    let newTotal;

    const getData = item => {
        console.log("get Data ran");
        console.log(item)
        console.log(item.length)
        if(username == "alert_tester"){
            sessionStorage.setItem('orderCount',item.length)
            dispatch({type:"SET_ORDER_COUNT",payload:item.length})
        }
      };

    const handleSubmit = () =>{
        signOut()
        dispatch({type:"LOG_OUT",payload:null})
    }

    console.log("cartAlerts")
    console.log(cartAlerts)
    console.log(typeof cartAlerts)

    useEffect(() =>{        
        socket.emit("initial_data",cartItems);
        socket.on("get_data", getData);        
        sessionCartItems = JSON.parse(sessionStorage.getItem('cart'))
        console.log("sessionCartItems:")
        console.log(typeof sessionCartItems)
        console.log(sessionCartItems)
        if(cartItemCount == null){
            sessionStorage.setItem('cartTotal',0)
        }
        showNotification()
        // sessionStorage.getItem('cart')
    },[username,cartItems])

const handleCartClick = () =>{
    dispatch({type:"TOGGLE_CART",payload:toggleCart})
}


    const useStyles = makeStyles(theme => ({
        root: {
          flexGrow: 1
        },
        grow: {
          flexGrow: 1,
          display: "flex",
          alignItems: "center"
        },
        icon: {
          marginRight: theme.spacing.unit,
          color: "green",
          fontSize: 45
        },
        mobile: {
          display: "none"
        },
        picture: {
          height: "50px",
          borderRadius: "90%",
          marginRight: theme.spacing.unit * 2
        },
        menuButton: {
          marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
          }
      })
    );

    if(cartItems.length > 0){
        try{
            sessionStorage.setItem('cart',JSON.stringify(cartItems))
        newTotal = cartItems.reduce((acc,cartItem) => acc + cartItem.quantity,0)
        sessionStorage.setItem('cartTotal',newTotal)
        } catch(e){
            console.log("cartItems is empty")
        }
    }
    let notifications =[]
    let orderNotice = {
          "update":"An order was created",
          "timestamp":Date.now
        }
      
    const classes = useStyles();

    const showNotification = () =>{
        addToast('An order was created', { appearance: 'success' }, () => console.log("toast shown"))
    }

    const showAlerts = () =>{
        fetchAlerts(dispatch)
        dispatch({type:"TOGGLE_ALERT_DROPDOWN",payload:!toggleAlertDropDown})
    }

    console.log("sessionCartItems:")
    console.log(sessionCartItems)
    return (
        <div className={classes.root}>
         <AppBar position="fixed">
         <Toolbar>
                {username ?
                <>                
                    <Typography className={classes.title}>
                        Hello, {username}
                    </Typography> 
                    <div onClick={showAlerts}>{orderCountItems}</div>
                    {toggleAlertDropDown ? (<AlertDropdown alerts={alerts}/>): null}
                    <Button edge="start" onClick={handleCartClick} className={classes.menuButton} color="inherit">
                        <ShoppingCartIcon />
                        Cart Items: {cartItemCount}
                    </Button>
                    {toggleCart ? (<CartDropdown cartItems={sessionCartItems} />):null}
                        <Button color="inherit" onClick={handleSubmit}>
                            Sign Out
                        </Button>
                    </>
                : <Typography className={classes.title}>Please log in</Typography>}
                
                <NotifyMe
                    data={notifications}
                    storageKey='notific_key'
                    notific_key='timestamp'
                    notific_value='update'
                    heading='Notification Alerts'
                    sortedByKey={false}
                    showDate={true}
                    size={24}
                    color="yellow"
                    />
            </Toolbar>
        </AppBar>
    </div>
    )        
}

export default Header;