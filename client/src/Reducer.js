const Reducer = (state, { type, payload }) => {
    switch (type) {

    case "CREATE_USER":
        return { 
            ...state, 
            username: payload
        }
    case "SIGN_IN_USER":
        return { 
            ...state, 
            username: payload
        }
    case "FETCH_USER":
        return{
            ...state,
            username:payload
        }
    case "LOG_OUT":
            return{
                ...state,
                username:null
            }
    case "FETCH_POSTS":
            return{
                ...state,
                posts:payload
            }        
    case "FETCH_ALL_POSTS":
            return{
                ...state,
                allPosts:payload
            }               
    // case  "FETCH_ALL_COMMENTS":
    //     return{
    //         ...state,
    //         allComments:payload
    //     }
    case "POST_ALL_COMMENTS":
        return{
            ...state,
            allComments:payload
        }
    default:
        return state
    }
}

export default Reducer;