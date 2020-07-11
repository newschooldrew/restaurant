import React, {useContext} from 'react'
import Context from '../../Context'

const Welcome = () => {
    const {state} = useContext(Context)
    const {user} = state;
    console.log(state)
    return (
        <div>
            Welcome, {user}
        </div>
    )
}

export default Welcome
