import axios from 'axios'
import React from 'react'
export const createUser = async user => {
    await axios.post('/create-user',user,{ 
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
        })
    }

export const signInUser = (user,history) =>{
        axios.post('/sign-in-user',user,{ 
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
    }).then(res => {
        console.log(res.headers['username'])
        localStorage.setItem('username',res.headers['username'])
        console.log(res.headers['authorization'])
        localStorage.setItem('token',res.headers['authorization'])
        // localStorage.setItem('token',res.headers['authorization'])
        console.log(localStorage.getItem('token'))
        history.push('/welcome')
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