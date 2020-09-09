import {addItemToCart,removeItemFromCart} from './utils/cart.utils'

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
    case "FETCH_PROFILE":
            return{
            ...state,
            profile:payload
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
    case "MEAL_UPDATED":
        return{
            ...state,
            hasUpdatedMeal:payload
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
    case "FETCH_ALL_MEALS":
                return{
                ...state,
                allMeals:payload
                }        
    case "ADD_ITEM_TO_CART":
        let sessionItems = JSON.parse(sessionStorage.getItem('cart'))
        console.log("sessionItems within reducer")
        console.log(sessionItems)
                return{
                ...state,
                cartItems:addItemToCart(sessionItems || [],payload)
                }          
    case "REMOVE_ITEM_FROM_CART":
        let sessionItems_1 = JSON.parse(sessionStorage.getItem('cart'))
        let cartTotal = JSON.parse(sessionStorage.getItem('cartTotal'))
                return{
                ...state,
                cartItems:removeItemFromCart(sessionItems_1 || [],payload,cartTotal)
                }          
    case "UPDATE_CART":
        return{
            ...state,
            cartItems:addItemToCart(payload,[])
            }
    case "CLEAR_CART":
        let sessionItems_2 = JSON.parse(sessionStorage.getItem('cart')) || []
        return{
            ...state,
            cartItems:sessionItems_2.filter(
                cartItem => cartItem.id !==payload.id
                )
            }
    case "EMPTY_CART":
                return{
                    ...state,
                    cartItems:[]
                }   
    case "FETCH_MEAL":
                return{
                    ...state,
                    meal:payload
                }   
    case "TOGGLE_EDIT_MEAL":
                return{
                    ...state,
                    editMeal:!payload
                }   
    case "CREATE_ORDER":
                return{
                    ...state,
                    order:payload
                }   
    case "TOGGLE_CART":
                return{
                    ...state,
                    toggleCart:!state.toggleCart
                }   
    case "FETCH_ALL_ORDERS":
                return{
                    ...state,
                    allOrders:payload
                }
    case "ORDER_CREATED":
                return{
                    ...state,
                    orderHit:payload
                }
    case "TOGGLE_ALERT_DROPDOWN":
                return{
                    ...state,
                    toggleAlertDropDown:!state.toggleAlertDropDown
                }
    case "SET_ORDER_COUNT":
                return{
                    ...state,
                    orderCount:payload
                }
    case "SET_ALERTS":
                return{
                    ...state,
                    alerts:payload
                }
    case "FETCH_ORDER_FROM_ALERT":
                return{
                    ...state,
                    fetchedOrderFromAlert:payload
                }
    case "EMPTY_CART":
                return{
                    ...state,
                    cart:null
                }
    case "FETCH_ORDERS_WITH_ID":
                return{
                    ...state,
                    individualOrders:null
                }
    case "HIT_DELETE_SWITCH":
                return{
                    ...state,
                    hitSwitch:payload
                }

    default:
        return state
    }
}

export default Reducer;