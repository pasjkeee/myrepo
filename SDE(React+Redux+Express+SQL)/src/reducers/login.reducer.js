
const initialState = {
    modalDisplay: "none",
    access_lvl: "",
    userId: "",
    isAutorized: false
}


function loginReducer(state = initialState, action){
    switch (action.type) {
        case 'CLOSE_MODAL':
            return { 
                 ...state,
                 modalDisplay: "none"
            };
        case 'OPEN_MODAL':
            return { 
                ...state,
                modalDisplay: "block"
            };
        case 'LOG_IN':
            const authenticated = action.authenticated;
            const userId = action.userId;
            const access_lvl = action.access_lvl;
            console.log(authenticated);

            return { 
                 ...state,
                 access_lvl: access_lvl,
                 userId: userId,
                 isAutorized: authenticated
            };
        
        case 'LOG_OUT':
            return { 
                 ...state,
                 access_lvl: "",
                 userId: "",
                 isAutorized: false
            };

        default: 
            return state;
    }
}

export default loginReducer;