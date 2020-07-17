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
    axios.post('/create-new-post', post).then(res => {
        if(res.headers.post === 'success'){
            localStorage.setItem('success',"Thanks! Post was successfully created")
        }
    })
}

export const fetchPosts = async (username,dispatch) =>{
    const res = await axios.post('/fetch-posts',{username:username});
        console.log("fetch posts response is: ")
        console.log(res.data)
        dispatch({type:"FETCH_POSTS",payload:res.data})
    }

export const fetchAllPosts = async (username,dispatch) =>{
    const res = await axios.get('/fetch-all-posts');
    console.log("fetch all posts:")
    console.log(res)
    dispatch({type:"FETCH_ALL_POSTS",payload:res.data})
}

export const postComment = (comment,username,id,key,dispatch) =>{
    const content = {comment,username,id,key}
    axios.post('/create-comment', content).then(res => {
        console.log("comment posted")
        const comments = res.data.comments;
        // const allComments = res.data
        // console.log(allComments)
        dispatch({type:"POST_ALL_COMMENTS",payload:comments})
    })
}

// export const fetchAllComments = dispatch =>{
//     axios.get('/fetch-all-comments').then(res => {
//         const allComments = res.data
//         console.log("allComments:")
//         console.log(allComments)
//         dispatch({type:"FETCH_ALL_COMMENTS",payload:allComments})
//     })
// }