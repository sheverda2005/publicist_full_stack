import { DELETE_ACCOUNT, EXIT,  VERIFY_TRUE } from "../types";

const initialState = {
    user: JSON.parse(localStorage.getItem('user'))
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case VERIFY_TRUE: 
            return {...state, user: action.payload}  
        case EXIT: 
            return {...state, user: null}
        case DELETE_ACCOUNT: 
            return {...state, user: null}    
        default:
          return state;
    }
}
