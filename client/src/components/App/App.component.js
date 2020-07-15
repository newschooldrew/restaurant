import React from 'react'
import {BrowserRouter, Switch,Route} from 'react-router-dom'
import SignUp from '../SignUp/SignUp.component'
import CreatePost from '../CreatePost/CreatePost'
import Welcome from '../Welcome/Welcome.component'
import SignIn from '../SignIn/SignIn'
import Header from '../Header/Header'

const App = () => {

        return (
            <BrowserRouter>
                        <Header />
                    <Switch>
                        <Route exact path="/" render={() => localStorage.getItem('token') ?  <Welcome /> : <SignUp /> } />
                        <Route path="/create-post" component={CreatePost} />
                        <Route path="/sign-in" component={SignIn} />
                        <Route path="/welcome" component={Welcome} />
                    </Switch>
            </BrowserRouter>
        )
    }

export default App;