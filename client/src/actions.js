import axios from 'axios'
import { responsiveFontSizes } from '@material-ui/core';

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
            history.push('/')
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

export const fetchUser = async (username,dispatch) =>{
    const res = await axios.post('/fetch-profile',{username})
    dispatch({type:"FETCH_PROFILE",payload:res.data.profile})
    dispatch({type:"FETCH_ALL_ORDERS",payload:res.data.orders})
    console.log("res:")
    console.log(res.data.profile)
}

export const fetchAllOrders = async dispatch =>{
    const res = await axios.get('/fetch-all-orders')
    console.log("fetch all orders:")
    console.log(res.data)
    dispatch({type:"FETCH_ALL_ORDERS",payload:res.data})
}

export const fetchOrderWithId = async (username,dispatch) =>{
    const res = await axios.post('/fetch-orders-with-id',{username})
    console.log("fetchOrderWithId")
    console.log(res.data.orders)
    dispatch({type:"FETCH_ORDERS_WITH_ID",payload:res.data.orders})
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

    export const fetchProfile = async (username,dispatch) =>{
        const res = await axios.post('/fetch-profile',{username});
            console.log("fetch user response is: ")
            console.log(res.data.profile)
            dispatch({type:"FETCH_PROFILE",payload:res.data.profile})
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

export const createMeal = async (title,price,description,url,singleSelect) =>{
    console.log("singleSelect:")
    console.log(singleSelect)
    const items = {title,price,description,url,singleSelect};
    const res = await axios.post('/create-meal', items);
        console.log(res.data)
}

export const updatePost = (post,dispatch) =>{
    axios.post('/update-post',post).then(res => {
        console.log("res:")
        console.log(res.data)
        dispatch({type:"POST_UPDATED",payload:res.data})
    })
}

export const updateProfile = (profile,dispatch) =>{
    axios.post('/update-profile',profile).then(res => {
        console.log("res:")
        console.log(res.data)
        dispatch({type:"PROFILE_UPDATED",payload:res.data})
    })
}
export const updateMeal = (meal,dispatch) => {
    axios.post('/update-meal',meal).then(res => {
        console.log("res:")
        console.log(res.data)
        dispatch({type:"MEAL_UPDATED",payload:res.data})
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

export const getPublicStripeKey = options => {
    return window
      .fetch(`/public-key`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return null;
        }
      })
      .then(data => {
        if (!data || data.error) {
          console.log("API error:", { data });
          throw Error("API Error");
        } else {
          return data.publicKey;
        }
      });
  };

  export const createPaymentIntent = async item => {
    const {username,actualName,address,city,province,postal_code,price,cartTotal} = item;
    //   dispatch({type:"CREATE_ORDER",payload:item})
    const options = {
        username,
        actualName,
        cartTotal,
        address,
        city,
        province,
        postal_code,
        price,
        currency: "USD"
      };
    const res = await axios.post('/create-payment-intent',options)
      return res.data;
  };
  
  export const createOrder = async item =>{
    const res = await axios.post('/create-order', item);
        console.log("new order created")        
}

export const sendSms = async (id,username,dispatch) =>{
    const obj = {id,username}
    const res = await axios.post('/send-sms', {obj});
        console.log("sms sent!")
        console.log(res)
        dispatch({type:"FETCH_ORDER_FROM_ALERT",payload:res.data})
}

export const sendDriver = async (id,username,dispatch) =>{
    const obj = {id,username}
    const res = await axios.post('/send-driver', {obj});
        console.log("driver sent!")
        console.log(res)
        dispatch({type:"FETCH_ORDER_FROM_ALERT",payload:res.data})
}

export const fetchAlerts = async (dispatch) =>{
    const res = await axios.get('/fetch-alerts');
        console.log("fetch alerts")
        console.log(res)
        dispatch({type:"SET_ALERTS",payload:res.data})
}

export const fetchOrderFromAlert = async (id,dispatch) =>{
    const res = await axios.post('/fetch-order-from-alert',{id});
        console.log("fetch order from alerts")
        console.log(res.data)
        dispatch({type:"FETCH_ORDER_FROM_ALERT",payload:res.data})
}

export const updateReadOnAlert = async id =>{
    console.log("update read on alert id:")
    console.log(id)
    const res = await axios.post('/update-read-on-alert',{id});
        console.log("fetch order from alerts")
        console.log(res.data.order)
}

export const deleteMeal = async id =>{
    console.log("update read on alert id:")
    console.log(id)
    const res = await axios.post('/delete-meal',{id});
        console.log("fetch order from alerts")
        console.log(res)
}

export const filterMeals = async (value,dispatch) =>{
    console.log("filter meals:")
    console.log(value)
    const res = await axios.post('/filter-meals',{value});
        console.log("fetch order from alerts")
        console.log(res.data)
        dispatch({type:"FETCH_ALL_MEALS",payload:res.data})
}
