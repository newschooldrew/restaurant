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
    case "POST_ALL_COMMENTS":
        return{
            ...state,
            allComments:payload
        }
    case "COMMENT_CREATE":
        return{
            ...state,
            newComment:payload
        }
    case "POST_UPDATED":
        return{
            ...state,
            hasUpdatedPost:payload
        }
    case "TOGGLE_EDIT_MODE":
        return{
            ...state,
            editMode:!payload
        }
    default:
        return state
    }
}

export default Reducer;