import { ERROR, ERROR_HIDE } from "../types";

const initialState = {
    error: false
}

export const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ERROR: 
           return {...state, error: action.payload}
        case ERROR_HIDE:
            return {...state, error: false}
        default:
            return state;
    }
}
