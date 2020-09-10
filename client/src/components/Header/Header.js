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
import HomeIcon from '@material-ui/icons/Home';

let socket = io('http://localhost:5001');

const HeaderToBeWrapped = ({history}) => {
    const {state,dispatch} = useContext(AuthContext)
    const {username,cartItems,toggleCart,toggleAlertDropDown,alerts,fetchedOrderFromAlert} = state;
    const { addToast } = useToasts()
    let cartAlerts = JSON.parse(sessionStorage.getItem('orderNotification'))
    let cartItemCount = sessionStorage.getItem('cartTotal')
    let orderCountItems = sessionStorage.getItem('orderCount')
    let sessionCartItems = JSON.parse(sessionStorage.getItem('cart'))
    let newTotal;

    const getData = item => {
        if(username == "alert_tester"){
            sessionStorage.setItem('orderCount',item.length)
            dispatch({type:"SET_ORDER_COUNT",payload:item.length})
        }
      };

    const handleSubmit = () =>{
        signOut(history)
        dispatch({type:"LOG_OUT",payload:null})
    }

    useEffect(() =>{        
        socket.emit("initial_data");
        socket.on("get_data", getData);        
        sessionCartItems = JSON.parse(sessionStorage.getItem('cart'))

        if(cartItemCount == null){
            sessionStorage.setItem('cartTotal',0)
        }
        showNotification()
    },[username,cartItems,alerts])

    useEffect(() =>{        
        socket.emit("initial_data");
        socket.on("get_data", getData);
    },[fetchedOrderFromAlert])

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
          color: "green",
          fontSize: 45
        },
        mobile: {
          display: "none"
        },
        picture: {
          height: "50px",
          borderRadius: "90%"
        },
        menuButton: {
          marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
          },
        alertStyle:{
            backgroundColor:'red',
            width:'5%',
            borderRadius:'55px',
            textAlign:'center'
        }
      })
    );

    const clickable = {
        cursor:'pointer',
        margin: '0 25px 0 0'
    }

    if(cartItems.length > 0){
        try{
            sessionStorage.setItem('cart',JSON.stringify(cartItems))
        newTotal = cartItems.reduce((acc,cartItem) => acc + cartItem.quantity,0)
        sessionStorage.setItem('cartTotal',newTotal)
        } catch(e){
            console.log("cartItems is empty")
        }
    }
      
    const classes = useStyles();
    
    const showNotification = () =>{
        addToast('An order was created', { appearance: 'success' }, () => console.log("toast shown"))
    }

    const showAlerts = () =>{
        fetchAlerts(dispatch)
        dispatch({type:"TOGGLE_ALERT_DROPDOWN",payload:!toggleAlertDropDown})
    }

    return (
        <div className={classes.root}>
         <AppBar position="fixed">
         <Toolbar>
             <HomeIcon onClick={() => history.push('/')} style={clickable}/>
                {username ?
                <>  
                        <Typography className={classes.title}>
                            Hello, {username}
                        </Typography>
                    
                    <div className={classes.alertStyle} onClick={showAlerts}>{orderCountItems}</div>
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
            </Toolbar>
        </AppBar>
    </div>
    )        
}
const Header = withRouter(HeaderToBeWrapped);
export {Header,socket};