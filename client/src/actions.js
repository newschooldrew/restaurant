import axios from 'axios'

export const createUser =  (user, dispatch,history) => {
    axios.post('/create-user',user,{ 
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
        }).then(res => {
            const {data} = res;
            console.log(data)
            if(res.data === 'user already exists'){
                console.log("user already exists!")
                localStorage.setItem("sign_up_msg","user already exists")
            }
            dispatch({type:"CREATE_USER",payload:data})
        })
        history.push('/welcome')
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

export const fetchAllMeals = async (dispatch) =>{
    const res = await axios.get('/fetch-all-meals');
        console.log("fetch posts response is: ")
        console.log(res.data)
        dispatch({type:"FETCH_ALL_MEALS",payload:res.data})
    }

export const fetchSpecificPost = async (postId,dispatch) =>{
    console.log("fetchSpecificPost:")
    console.log(postId)
    const res = await axios.post('/fetch-specific-post',{postId});
    console.log("fetch specific post")
    console.log(res)
    dispatch({type:"FETCH_INDIVIDUAL_POST",payload:res.data})
}

export const fetchAllPosts = async (username,dispatch) =>{
    const res = await axios.get('/fetch-all-posts');
    console.log("fetch all posts:")
    console.log(res)
    dispatch({type:"FETCH_ALL_POSTS",payload:res.data})
}

export const postComment = async (comment,username,id,key,dispatch) =>{
    const content = {comment,username,id,key}
    const res = await axios.post('/create-comment', content);
        console.log("newest comment posted")
        console.log(res.data["content"])
        const newComment = res.data["content"]
        dispatch({type:"COMMENT_CREATE",payload:newComment})
}

export const updatePost = (post,dispatch) =>{
    axios.post('/update-post',post).then(res => {
        console.log("res:")
        console.log(res.data)
        dispatch({type:"POST_UPDATED",payload:res.data})
    })
}

export const editComment = async comment =>{
    const res = await axios.post('/edit-comment',comment);
}

export const increaseLike = async (id,username,dispatch) =>{
    console.log("id:")
    console.log(id,username)
    const res = await axios.post('/increase-like',{id,username});
    console.log(res)
    dispatch({type:"POST_LIKED",payload:true})
}

export const decreaseLike = async (id,username,dispatch) =>{
    console.log("id:")
    console.log(id)
    const res = await axios.post('/decrease-like',{id,username});
    console.log(res)
    dispatch({type:"POST_DISLIKED",payload:true})
}

export const increaseCommentLike = async (idPost,idComment,username,dispatch) =>{
    console.log("idPost,idComment:")
    console.log(idPost,idComment)

    const res = await axios.post('/increase-comment-like',{idPost,idComment,username});
    dispatch({type:"COMMENT_LIKED",payload:true})

}

export const decreaseCommentLike = async (idPost,idComment,username,dispatch) =>{
    const res = await axios.post('/decrease-comment-like',{idPost,idComment,username});
    dispatch({type:"COMMENT_DISLIKED",payload:true})
}

export const fetchFavorites = async (username,dispatch) =>{
    const res = await axios.post('/fetch-favorites',{username});
    const favorites = res.data.favorites;
    console.log(favorites)
    dispatch({type:"FETCH_FAVORITES",payload:favorites})
    return favorites
}

export const inputMeals = async (csvFile,dispatch) =>{
    const res = await axios.post('/input-file',csvFile)
    console.log("inputMeals res:")
    console.log(res)
}

export const actionItemToCart = async (cartItemToAdd,dispatch) =>{
        const res = await axios.post('/storeCheckout',cartItemToAdd)
        console.log(res)
        dispatch({type:"ADD_ITEM_TO_CART",payload:cartItemToAdd})
    }

export const fetchMealById = async (id,dispatch) =>{
    console.log("id:")
    console.log(id)
    const res = await axios.post('/find-meal',{id});
    console.log(res.data)
    dispatch({type:"FETCH_MEAL",payload:res.data})
}