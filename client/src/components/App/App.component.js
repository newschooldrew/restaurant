import React from 'react'
import {BrowserRouter, Switch,Route,Redirect} from 'react-router-dom'
import SignUp from '../SignUp/SignUp.component'
import CreatePost from '../CreatePost/CreatePost'
import SignIn from '../SignIn/SignIn'
import {Header} from '../Header/Header'
import AllMeals from '../AllMeals/AllMeals'
import ProductPage from '../ProductPage/ProductPage'
import CheckoutPage from '../Checkout/Checkout'
import LandingPage from '../LandingPage/LandingPage'
import Dashboard from '../Dashboard/Dashboard'
import Receipt from '../Receipt/Receipt'
import ViewAllOrders from '../ViewAllOrders/ViewAllOrders'
import ConfirmOrder from '../ConfirmOrder/ConfirmOrder'
import AddMeal from '../AddMeal/AddMeal'
import "../../assets/css/demo.css";

const divStyle = {
    overflow: 'scroll'
  }

const App = () => {
        return (
            <BrowserRouter>
                        <Header />
                    <Switch>
                        <Route exact path="/" component={LandingPage} />
                        <Route exact path="/sign-in" render={() => localStorage.getItem('token') ?  <Redirect to="/" /> : <SignIn /> } />
                        <Route exact path="/create-post" render={() => localStorage.getItem('token') ?  <CreatePost /> : <SignIn /> } />
                        <Route exact path="/checkout" component={CheckoutPage} />
                        <Route exact path="/confirm-order/:id" render={(props) => (<ConfirmOrder key={props.match.params.pageid} {...props} />)} />
                        <Route path="/product-page/:id" component={ProductPage} />
                        <Route path="/all-meals" component={AllMeals} />
                        <Route path="/sign-up" component={SignUp} />
                        <Route path="/admin" component={Dashboard} />
                        <Route path="/add-meal" component={AddMeal} />
                        <Route path="/receipt" component={Receipt} />
                        <Route path="/view-all-orders" component={ViewAllOrders} />
                    </Switch>
            </BrowserRouter>
        )
    }

export default App;