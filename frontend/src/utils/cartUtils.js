export const addDecimals = (num) => {
    return (Math.round(num*100) /100).toFixed(2)
}

export const updateCart = (state) => {
 //caclculate items price
 state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price *item.qty,0));

 //caclculate shipping price(order over $100, free shipping else $10)
 state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10)

 //caclculate tax price (15% tax rate)
 state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice).toFixed(2))

 //caclculate total price
 state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2)

 //saving it to local storage
 localStorage.setItem('cart',JSON.stringify(state))

 return state
}