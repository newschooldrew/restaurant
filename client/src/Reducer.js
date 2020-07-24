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
    case "COMMENT_LIKED":
        return{
            ...state,
            commentLiked:payload,
            commentDisliked:false
        }
    case "COMMENT_DISLIKED":
        return{
            ...state,
            commentLiked:false,
            commentDisliked:payload
            }
    case "FETCH_FAVORITES":
    return{
        ...state,
        favorites:payload
    }

    case "POST_LIKED":
        return{
            ...state,
            postLiked:payload,
            postDisliked:false
        }
    case "POST_DISLIKED":
            return{
            ...state,
            postLiked:false,
            postDisliked:payload
            }
    case "FETCH_INDIVIDUAL_POST":
                return{
                ...state,
                individualPost:payload
                }        
    default:
        return state
    }
}

export default Reducer;