import React, {useEffect,useContext} from 'react'
import AuthContext from '../../AuthContext'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';

const Checkout_v2 = () => {
    const {state,dispatch} = useContext(AuthContext)
    const {username,cartItems} = state;

    const useStyles = makeStyles(theme => ({
        root: {
          flexGrow: 1
        },  
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 500,
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
          image: {
            width: 128,
            height: 128,
          },
          img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
          }
      })
    );

    const classes = useStyles();
    const handleClick = item =>{
        let cartCount = JSON.parse(sessionStorage.getItem('cart'))
        if(cartCount && cartCount.length == 1){
            sessionStorage.removeItem('cart');
            sessionStorage.setItem('cartTotal',0)
        }else{
            dispatch({type:"CLEAR_CART",payload:item})
        }
    }

    let sessionItems = JSON.parse(sessionStorage.getItem('cart'))
    if(!cartItems && !sessionItems) return (<div>loading checkout items</div>)
    return(
        <div>
        <Link to="/all-meals">All Meals</Link>
        {
            (() => {
                if (cartItems && cartItems.length > 0){
                    return (
                        cartItems.map(item =>{
                            return(
                            <div className={classes.root}>
                            <Paper className={classes.paper}>
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <ButtonBase className={classes.image}>
                                            <img className={classes.img} src="https://res.cloudinary.com/dzdvrgbjd/image/upload/v1589221466/react_j2pgwp.png" />
                                        </ButtonBase>
                                    </Grid>
                                    <Grid item xs={9} sm container>
                                        <Grid item xs container direction="row" spacing={2}>
                                                    <Typography gutterBottom  className={classes.grow}>{item.title}</Typography>
                                                    <Typography gutterBottom  className={classes.grow}>{item.price}</Typography>
                                                    <Typography gutterBottom  className={classes.grow}>{item.quantity}</Typography>
                                                    <Button onClick={() => handleClick(item)}>x</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                                </div>)
                                }) 
                    )}
                    else if (sessionItems && sessionItems.length > 0){
                        return(
                            sessionItems.map(item =>{
                                return(
                                <div className={classes.root}>
                                <Paper className={classes.paper}>
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <ButtonBase className={classes.image}>
                                            <img className={classes.img} src="https://res.cloudinary.com/dzdvrgbjd/image/upload/v1589221466/react_j2pgwp.png" />
                                        </ButtonBase>
                                    </Grid>
                                    <Grid item xs={9} sm container>
                                        <Grid item xs container direction="row" spacing={2}>
                                            <Typography className={classes.grow}>{item.title}</Typography>
                                            <Typography className={classes.grow}>{item.price}</Typography>
                                            <Typography className={classes.grow}>{item.quantity}</Typography>
                                    <Button onClick={() => handleClick(item)}>x</Button>
                                    </Grid>
                                    </Grid>
                                </Grid>
                                </Paper>
                        </div>)
                            })
                        )}
                    else {return <span>No items left in this cart</span>}
                })()
                }
        </div>
    )
}

export default Checkout_v2
