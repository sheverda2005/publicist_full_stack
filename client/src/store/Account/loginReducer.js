import { EMAIL, FINISHED_SUCCESS, PASSWORD} from "../types";

const initialState = {
    email : null,
    password: null,
}

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case EMAIL:
            return {...state, email: action.payload}
        case PASSWORD: 
            return {...state, password: action.payload}
        case FINISHED_SUCCESS:
            return {...state, email: null, password: null}
        default:
            return state;
    }
}