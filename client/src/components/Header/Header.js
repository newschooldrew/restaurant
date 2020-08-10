import React,{useContext,useEffect} from 'react'
import AuthContext from '../../AuthContext'
import AppBar from "@material-ui/core/AppBar";
import {signOut} from '../../actions'
import {withRouter} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';

const Header = ({history}) => {
    const {state,dispatch} = useContext(AuthContext)
    // const {username} = state;
    const {username,cartItems} = state;
    let cartItemCount = sessionStorage.getItem('cartTotal')
    let newTotal;

    const handleSubmit = () =>{
        signOut(history)
        dispatch({type:"LOG_OUT",payload:null})
    }

    console.log("cartItems")
    console.log(cartItems)
    console.log(typeof cartItems)

    let mySession;
   
    useEffect(() =>{        
        mySession = sessionStorage.getItem('cart')
        console.log("mySession:")
        console.log(mySession)
        console.log("cartItemCount:")
        console.log(cartItemCount)
        if(cartItemCount == null){
            sessionStorage.setItem('cartTotal',0)
        }
        // sessionStorage.getItem('cart')
    },[])

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
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
         <AppBar position="static">
         <Toolbar>
                {username ?
                <>
                    <Typography className={classes.title}>
                        Hello, {username}
                    </Typography> 
                <Typography edge="start" className={classes.menuButton} color="inherit">Cart Items: {cartItemCount}</Typography>
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

export default withRouter(Header)
