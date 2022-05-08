import { FINISHED_REGISTER, REGISTER_EMAIL, REGISTER_NAME, REGISTER_PASSWORD, REGISTER_SURNAME } from "../types";

const initialState = {
    email: '',
    password: '',
    useName: '',
    surName: ''
}

export const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_EMAIL:
            return {...state, email: action.payload}
        case REGISTER_PASSWORD:
            return {...state, password: action.payload}
        case REGISTER_NAME:
            return {...state, useName: action.payload}
        case REGISTER_SURNAME:
            return {...state, surName: action.payload}
        case FINISHED_REGISTER:
            return {...state, email: '', password: '', useName: '', surName: ''}
        default:
            return state;
    }
}