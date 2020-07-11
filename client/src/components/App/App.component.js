import React, {useContext,useReducer} from 'react'
import {BrowserRouter, Switch,Route} from 'react-router-dom'
import SignUp from '../SignUp/SignUp.component'
import CreatePost from '../CreatePost/CreatePost'
import Welcome from '../Welcome/Welcome.component'
import Context from '../../Context'
import Reducer from '../../Reducer'

const App = () => {
    const INITIAL_STATE = useContext(Context)
    const [state,dispatch] = useReducer(Reducer, INITIAL_STATE)

        return (
            <BrowserRouter>
                <Context.Provider value={{state,dispatch}}>
                    <Switch>
                        <Route exact path="/" component={SignUp} />
                        <Route path="/create-post" component={CreatePost} />
                        <Route path="/welcome" component={Welcome} />
                    </Switch>
                </Context.Provider>
            </BrowserRouter>
        )
    }
export default App;