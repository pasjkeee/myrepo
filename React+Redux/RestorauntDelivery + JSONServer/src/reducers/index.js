const initialState = {
    menu: [],
    loading: true,
    error: false,
    choosed: null,
    cartItems: [],
    fullPrice: 0
}

const reducer = (state = initialState, action) => {
    //console.log(state, action);
    switch (action.type) {
        case 'CHOOSE_ITEM':
            return { 
                ...state,
                choosed: action.payload
            };
        case 'MENU_LOADED':
            return { 
                ...state,
                loading: false,
                menu: action.payload
            };
        case 'MENU_REQUSTED':
            return { 
                ...state,
                loading: true
            };
        case 'LOADING_ERROR':
            return { 
                ...state,
                error: true
            };
        case 'DELETE_FROM_CART':
            const newcartItems = state.cartItems.slice(0)
            const newcartItemsId = newcartItems.findIndex(item => item.id === action.payload);
            const cartItemOnDelete = newcartItems.slice(newcartItemsId, newcartItemsId+1);
            newcartItems.splice(newcartItemsId, 1);
            console.log(newcartItems, "Hi");
            return {
                ...state,
                fullPrice: state.fullPrice - cartItemOnDelete[0].price,
                cartItems: newcartItems
            };
        case 'ADD_INTO_CARD':
            console.log(action.payload, "reduce");
            return { 
                ...state,
                fullPrice: state.fullPrice + action.payload.price,
                cartItems: [...state.cartItems, action.payload]
            };
        default: 
            return state;
        
    }
}

export default reducer;