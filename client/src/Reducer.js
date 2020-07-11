const Reducer = (state, { type, payload }) => {
    switch (type) {

    case "CREATE_USER":
        return { 
            ...state, 
            user: payload
        }

    default:
        return state
    }
}

export default Reducer;