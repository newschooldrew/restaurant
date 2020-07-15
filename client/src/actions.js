import axios from 'axios'

export const createUser =  user => {
    axios.post('/create-user',user,{ 
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
        }).then(res => {
            console.log(res)
            if(res.data === 'user already exists'){
                console.log("user already exists!")
                localStorage.setItem("sign_up_msg","user already exists")
            }
        })
    }

export const signInUser = (user,history) =>{
        
        axios.post('/sign-in-user',user,{ 
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
    }).then(res => {
        console.log(res.data)
        
        if(res.data === 'user not found' || res.data === 'password not found'){
            localStorage.setItem("sign_in_msg","login credentials not found")
        }
         else{
            localStorage.setItem('username',res.headers['username'])
            localStorage.setItem('token',res.headers['authorization'])

            history.push('/welcome')
        }
    })
}

export const getUser = () =>{

    const token = localStorage.getItem('token');
    if(token){
        console.log("welcome")
        console.log(token)
    }else{
        console.log("please sign in")
    }
}

export const signOut = history =>{
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    history.push('/')
}

export const createPost = post =>{
    axios.post('/create-post', post)
}