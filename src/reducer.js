export const initialState = {
    cart : [],
    user: null
}

export const getCartTotal = (cart)=>
    cart ?.reduce((amount, item) =>parseInt(item.price) + amount, 0);

    
    // export const getCartTotal = (cart)=>{
    //     let i;
    //     let totalPrice = 0;
    //     for(i=0; i<cart.length; i++){
    //         totalPrice += parseInt(cart[i].price)
    //     }
    // }
    

const reducer = (state, action) =>{
    switch (action.type){
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: [...state.cart , action.item] 
            }
        case 'REMOVE_FROM_CART':
           const index = state.cart.findIndex((cartItem)=> cartItem.id === action.id);
           let newCart = [...state.cart];

           if(index>=0){
               newCart.splice(index, 1);
           }else{
               console.warn(`Cannot remove product as (id: ${action.id}) is not in cart`)
           }

           return{
               ...state,
               cart: newCart
           }
        case 'SET_USER':
            return {
                ...state,
                user: action.user
        }
        default :
            return state;
    }
}

export default reducer;