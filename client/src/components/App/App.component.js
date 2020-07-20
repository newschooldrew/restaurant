import React from 'react'
import {BrowserRouter, Switch,Route,Redirect} from 'react-router-dom'
import SignUp from '../SignUp/SignUp.component'
import CreatePost from '../CreatePost/CreatePost'
import Welcome from '../Welcome/Welcome.component'
import SignIn from '../SignIn/SignIn'
import Header from '../Header/Header'
import Posts from '../Posts/Posts'
import EditProfile from '../EditProfile/EditProfile'

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
                        <Route path="/posts" component={Posts} />
                    </Switch>
            </BrowserRouter>
        )
    }

export default App;