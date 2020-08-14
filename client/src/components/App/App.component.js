import React from 'react'
import {BrowserRouter, Switch,Route,Redirect} from 'react-router-dom'
import SignUp from '../SignUp/SignUp.component'
import CreatePost from '../CreatePost/CreatePost'
import Welcome from '../Welcome/Welcome.component'
import SignIn from '../SignIn/SignIn'
import Header from '../Header/Header'
import PostPage from '../../pages/PostPage/PostPage'
import EditProfile from '../EditProfile/EditProfile'
import AllMeals from '../AllMeals/AllMeals'
import InputMeals from '../InputMeals/InputMeals'
import ProductPage from '../ProductPage/ProductPage'
import Checkout from '../Checkout/Checkout'
import CheckoutPage from '../Checkout/Checkout'
import LandingPage from '../LandingPage/LandingPage'
import EditMealContainer from '../EditMealContainer/EditMealContainer'

const App = () => {
        return (
            <BrowserRouter>
                        <Header />
                    <Switch>
                        <Route exact path="/" render={() => localStorage.getItem('token') ?  <Welcome /> : <SignUp /> } />
                        <Route exact path="/sign-in" render={() => localStorage.getItem('token') ?  <Redirect to="/" /> : <SignIn /> } />
                        <Route exact path="/create-post" render={() => localStorage.getItem('token') ?  <CreatePost /> : <SignIn /> } />
                        <Route path="/welcome" component={Welcome} />
                        <Route path="/sign-up" component={SignUp} />
                        <Route path="/edit-profile" component={EditProfile} />
                        <Route path="/posts" component={PostPage} />
                        <Route path="/all-meals" component={AllMeals} />
                        <Route path="/input-meals" component={InputMeals} />
                        {/* <Route path="/checkout" component={Checkout} /> */}
                        <Route path="/product-page/:id" component={ProductPage} />
                        <Route path="/checkout" component={CheckoutPage} />
                        <Route exact path="/landing-page" component={LandingPage} />
                        <Route exact path="/edit-meal" component={EditMealContainer} />
                    </Switch>
            </BrowserRouter>
        )
    }

export default App;