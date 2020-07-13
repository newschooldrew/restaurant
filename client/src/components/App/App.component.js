import React, {useContext,useReducer, useEffect} from 'react'
import {BrowserRouter, Switch,Route} from 'react-router-dom'
import SignUp from '../SignUp/SignUp.component'
import CreatePost from '../CreatePost/CreatePost'
import Welcome from '../Welcome/Welcome.component'
import SignIn from '../SignIn/SignIn'
import Context from '../../Context'
import Reducer from '../../Reducer'
import axios from 'axios'

const App = () => {
    const INITIAL_STATE = useContext(Context)
    const [state,dispatch] = useReducer(Reducer, INITIAL_STATE)

    useEffect(()=>{
        const token = localStorage.getItem("token")
        axios.post('/get-user',token)
        axios.post('/get-user',user,{ 
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
            }
        })
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