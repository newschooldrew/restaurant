const Reducer = (state, { type, payload }) => {
    switch (type) {

    case "CREATE_USER":
        return { 
            ...state, 
            user: payload
        }
    case "SIGN_IN_USER":
        return { 
            ...state, 
            user: payload
        }

    default:
        return state
    }
}

export default Reducer;