import React, {useContext,useReducer, useEffect} from 'react'
import {BrowserRouter, Switch,Route} from 'react-router-dom'
import SignUp from '../SignUp/SignUp.component'
import CreatePost from '../CreatePost/CreatePost'
import Welcome from '../Welcome/Welcome.component'
import SignIn from '../SignIn/SignIn'
import Context from '../../Context'
import Reducer from '../../Reducer'
import {getUser} from '../../actions'
import axios from 'axios'

const App = () => {
    const INITIAL_STATE = useContext(Context)
    const [state,dispatch] = useReducer(Reducer, INITIAL_STATE)

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            console.log("welcome")
            console.log(token)
        }else{
            console.log("please sign in")
        }
    },[])

        return (
            <BrowserRouter>
                <Context.Provider value={{state,dispatch}}>
                    <Switch>
                        <Route exact path="/" component={SignUp} />
                        <Route path="/create-post" component={CreatePost} />
                        <Route path="/sign-in" component={SignIn} />
                        <Route path="/welcome" component={Welcome} />
                    </Switch>
                </Context.Provider>
            </BrowserRouter>
        )
    }
export default App;