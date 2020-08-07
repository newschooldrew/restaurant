export const addItemToCart = (cartItems = [], cartItemToAdd) =>{
    if (cartItems == undefined){
        console.log("cartItems is undefined")
        cartItems.push(cartItemToAdd)
    }
        const existingCartItem = cartItems.find(
            cartItem =>cartItem.id === cartItemToAdd.id
            )
        if(existingCartItem){
            return cartItems.map(cartItem =>
                    // returns a new array
                    // this returns a new version of our state
                    // so our components know how to re render properly
                    cartItem.id === cartItemToAdd.id
                    ? {...cartItem, quantity:cartItem.quantity + 1}
                    : cartItem
            )
        }

        return [...cartItems,{...cartItemToAdd,quantity:1}]
    }