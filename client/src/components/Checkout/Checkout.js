/*eslint-disable*/
import React, {useContext} from "react";
import AuthContext from '../../AuthContext'
import {Link} from 'react-router-dom'
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
// core components
import Header from "../Header/Header_Checkout.js";
import HeaderLinks from "../Header/HeaderLinks.js";
import Parallax from "../Parallax/Parallax.js";
import Grid from '@material-ui/core/Grid';
import GridContainer from "../Grid/GridContainer.js";
import GridItem from "../Grid/GridItem.js";
// import Footer from "components/Footer/Footer.js";
import Table from "../Table/Table.js";
import Button from "../CustomButtons/Button.js";
import Card from "../Card/Card.js";
import CardBody from "../Card/CardBody.js";
import {totalPrice,totalItemPrice} from '../../utils/cart.utils' 

import shoppingCartStyle from "../../assets/jss/material-kit-pro-react/views/shoppingCartStyle.js";

import product1 from "../../assets/img/product1.jpg";
import product2 from "../../assets/img/product2.jpg";
import product3 from "../../assets/img/product3.jpg";

const useStyles = makeStyles(shoppingCartStyle);

export default function ShoppingCartPage() {
  const {state,dispatch} = useContext(AuthContext)
  const {username,cartItems} = state;

  React.useEffect(() => {
    console.log("cartItems:")
    console.log(cartItems)
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  },[]);

  const addItemToCart = (id,title,price) =>{
    console.log("add item from cart")
    const item = {id,title,price};
    dispatch({type:"ADD_ITEM_TO_CART",payload:item})
}

const removeItemFromCart = (id,title,price) =>{
  console.log("remove item from cart")
  const item = {id,title,price};
  dispatch({type:"REMOVE_ITEM_FROM_CART",payload:item})
  let myCachedTotal = JSON.parse(sessionStorage.getItem('cartTotal'))
  console.log("myCachedTotal:")
  console.log(myCachedTotal)
  if(myCachedTotal == 1){
      console.log("Clear cart")
      sessionStorage.removeItem('cart');
      sessionStorage.setItem('cartTotal',0)
  }
}

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

  const classes = useStyles();
  return (
    <div>
      <Parallax
        image={require("../../assets/img/bg3.jpg")}
        filter="dark"
        small
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem
              md={8}
              sm={8}
              className={classNames(
                classes.mlAuto,
                classes.mrAuto,
                classes.textCenter
              )}
            >
              <h2 className={classes.title}>Shopping Page</h2>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

                    <div className={classNames(classes.main, classes.mainRaised)}>
                      <div className={classes.container}>
                        <Card plain>
                          <CardBody plain>
                            <h3 className={classes.cardTitle}>Shopping Cart</h3>
                    {(() => {
                    if(sessionItems && sessionItems.length > 0){
                      // let cartItemCount = sessionStorage.getItem('cartTotal')
                      let cartItemCount = JSON.parse(sessionStorage.getItem('cart'))
                      console.log("sessionItems function:")
                      console.log(sessionItems)
                      return(
                        sessionItems.map((item,idx) =>{
                          console.log("item.url:")
                          console.log(item.url)
                          console.log("cartItemCount[idx].quantity:")
                          console.log(cartItemCount[idx])
                                          const {id,title,price} = item;
                                            return(
                                    <Table
                                    key={id}
                                      tableHead={[
                                        "",
                                        "PRODUCT",
                                        "COLOR",
                                        "SIZE",
                                        "PRICE",
                                        "QTY",
                                        "AMOUNT",
                                        ""
                                      ]}
                                    tableData={[
                                      [  
                                    <div className={classes.imgContainer} key={1}>
                                    <img src={item.url} alt="..." className={classes.img} />
                                      </div>,
                                        <span key={1}>
                                        <a href="#jacket" className={classes.tdNameAnchor}>
                                          {item.title}
                                        </a>
                                        <br />
                                        <small className={classes.tdNameSmall}>
                                          {item.description}
                                        </small>
                                      </span>,
                                      "Red",
                                      "M",
                                      <span key={1}>
                                        <small className={classes.tdNumberSmall}>$</small> {item.price}
                                      </span>,
                                      <span key={1}>
                                        {` `}
                                        <div className={classes.buttonGroup}>
                                          <Button
                                            color="info"
                                            size="sm"
                                            round
                                            className={classes.firstButton}
                                            onClick={() => removeItemFromCart(id,title,price)}
                                          >
                                            <Remove />
                                          </Button>
                                          
                          {cartItemCount[idx].quantity}
                                          <Button
                                            color="info"
                                            size="sm"
                                            round
                                            className={classes.lastButton}
                                            onClick={() => addItemToCart(id,title,price)}
                                          >
                                            <Add />
                                          </Button>
                                        </div>
                                      </span>,
                                      <span key={1}>
                                        <small className={classes.tdNumberSmall}>$</small> {totalItemPrice(item)}
                                      </span>,
                                      <Tooltip
                                        key={1}
                                        id="close1"
                                        title="Remove item"
                                        placement="left"
                                        classes={{ tooltip: classes.tooltip }}
                                      >
                                        <Button link className={classes.actionButton}>
                                          <Close  onClick={() => handleClick(item)}/>
                                        </Button>
                                      </Tooltip>
                                    ]   
                                    ]}
                                    tableShopping
                                          customHeadCellClasses={[
                                            classes.textCenter,
                                            classes.description,
                                            classes.description,
                                            classes.textRight,
                                            classes.textRight,
                                            classes.textRight
                                          ]}
                                          customHeadClassesForCells={[0, 2, 3, 4, 5, 6]}
                                          customCellClasses={[
                                            classes.tdName,
                                            classes.customFont,
                                            classes.customFont,
                                            classes.tdNumber,
                                            classes.tdNumber + " " + classes.tdNumberAndButtonGroup,
                                            classes.tdNumber + " " + classes.textCenter
                                          ]}
                                          customClassesForCells={[1, 2, 3, 4, 5, 6]}
                                        />
                                            )
                                          })
                                         )
                                      }else {return <span>No items left in this cart</span>}
                                    })()
                                    }
                                      <Grid container spacing={1}>    
                                      <Grid item xs={3}></Grid>
                                      <Grid item xs={3}>
                                        <Typography>Total</Typography>                        
                                      </Grid>
                                      <Grid item xs={3}>        
                                          <span >
                                            <small>$</small>{totalPrice(sessionItems||cartItems)}
                                          </span>
                                        </Grid>
                                        <Grid item xs={3}>
                                        <Button color="info" round>
                                          Complete Purchase <KeyboardArrowRight />
                                        </Button>
                                        </Grid>
                                      </Grid>
                                      </CardBody>
                                    </Card>
                                    </div>
                                    </div>
                            </div>)}





                {/* // START OF MY JS

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
                } */}














      {/* <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <Card plain>
            <CardBody plain>
              <h3 className={classes.cardTitle}>Shopping Cart</h3>
              <Table
                tableHead={[
                  "",
                  "PRODUCT",
                  "COLOR",
                  "SIZE",
                  "PRICE",
                  "QTY",
                  "AMOUNT",
                  ""
                ]}
                tableData={[
                  [
                    <div className={classes.imgContainer} key={1}>
                      <img src={product1} alt="..." className={classes.img} />
                    </div>,
                    <span key={1}>
                      <a href="#jacket" className={classes.tdNameAnchor}>
                        Spring Jacket
                      </a>
                      <br />
                      <small className={classes.tdNameSmall}>
                        by Dolce&amp;Gabbana
                      </small>
                    </span>,
                    "Red",
                    "M",
                    <span key={1}>
                      <small className={classes.tdNumberSmall}>€</small> 549
                    </span>,
                    <span key={1}>
                      1{` `}
                      <div className={classes.buttonGroup}>
                        <Button
                          color="info"
                          size="sm"
                          round
                          className={classes.firstButton}
                        >
                          <Remove />
                        </Button>
                        <Button
                          color="info"
                          size="sm"
                          round
                          className={classes.lastButton}
                        >
                          <Add />
                        </Button>
                      </div>
                    </span>,
                    <span key={1}>
                      <small className={classes.tdNumberSmall}>€</small> 549
                    </span>,
                    <Tooltip
                      key={1}
                      id="close1"
                      title="Remove item"
                      placement="left"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Button link className={classes.actionButton}>
                        <Close />
                      </Button>
                    </Tooltip>
                  ],
                  {
                    purchase: true,
                    colspan: "3",
                    amount: (
                      <span>
                        <small>€</small>2,346
                      </span>
                    ),
                    col: {
                      colspan: 3,
                      text: (
                        <Button color="info" round>
                          Complete Purchase <KeyboardArrowRight />
                        </Button>
                      )
                    }
                  }
                ]}
                tableShopping
                customHeadCellClasses={[
                  classes.textCenter,
                  classes.description,
                  classes.description,
                  classes.textRight,
                  classes.textRight,
                  classes.textRight
                ]}
                customHeadClassesForCells={[0, 2, 3, 4, 5, 6]}
                customCellClasses={[
                  classes.tdName,
                  classes.customFont,
                  classes.customFont,
                  classes.tdNumber,
                  classes.tdNumber + " " + classes.tdNumberAndButtonGroup,
                  classes.tdNumber + " " + classes.textCenter
                ]}
                customClassesForCells={[1, 2, 3, 4, 5, 6]}
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  ); */}