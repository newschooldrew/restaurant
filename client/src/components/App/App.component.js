import React from 'react'
import {BrowserRouter, Switch,Route,Redirect} from 'react-router-dom'
import SignUp from '../SignUp/SignUp.component'
import CreatePost from '../CreatePost/CreatePost'
import SignIn from '../SignIn/SignIn'
import Header from '../Header/Header'
import AllMeals from '../AllMeals/AllMeals'
import ProductPage from '../ProductPage/ProductPage'
import CheckoutPage from '../Checkout/Checkout'
import LandingPage from '../LandingPage/LandingPage'
import Dashboard from '../Dashboard/Dashboard'
import Sidebar from '../Sidebar/Sidebar'
import "../../assets/css/demo.css";

const divStyle = {
    overflow: 'scroll'
  }

const App = () => {
        return (
            <BrowserRouter>
                        <Header />
                    <Switch>
                        <Route exact path="/" render={() => localStorage.getItem('token') ?  <LandingPage /> : <SignUp /> } />
                        <Route exact path="/sign-in" render={() => localStorage.getItem('token') ?  <Redirect to="/" /> : <SignIn /> } />
                        <Route exact path="/create-post" render={() => localStorage.getItem('token') ?  <CreatePost /> : <SignIn /> } />
                        <Route path="/all-meals" component={AllMeals} />
                        <Route path="/sign-up" component={SignUp} />
                        <Route path="/product-page/:id" component={ProductPage} />
                        <Route path="/checkout" component={CheckoutPage} />
                        <Route path="/admin" component={Dashboard} />
                        <Route path="/sidebar" component={Sidebar} />
                    </Switch>
            </BrowserRouter>
        )
    }

export default App;