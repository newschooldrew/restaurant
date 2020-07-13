import axios from 'axios'

export const createUser = async user => {
    await axios.post('/create-user',user,{ 
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
        })
    }

export const signInUser = async (user, token) =>{
    await axios.post('/sign-in-user',user,{ 
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
        }
    })
}