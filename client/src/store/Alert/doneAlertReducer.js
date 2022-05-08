import { DONE_ALERT, HIDE_DONE_ALERT } from "../types";

const initialState = {
    done: false
}

export const doneAlertReducer = (state = initialState, action) => {
    switch (action.type) {
        case DONE_ALERT: 
           return {...state, done: action.payload}
        case HIDE_DONE_ALERT:
            return {...state, done: false}
        default:
            return state;
    }
}
