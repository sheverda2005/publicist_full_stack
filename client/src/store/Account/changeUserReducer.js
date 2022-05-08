import { CHANGE_NAME, CHANGE_SURNAME, EXIT, VERIFY_TRUE } from "../types";

const initialState = {
    id: '',
    email: '',
    useName: '',
    surName: '',
}
export const changeUserReduser = (state = initialState, action) => {
    switch (action.type) {
        case VERIFY_TRUE:
            return {...state, id: JSON.parse(localStorage.getItem('user')).id, email: JSON.parse(localStorage.getItem('user')).email, useName: JSON.parse(localStorage.getItem('user')).useName,  surName: JSON.parse(localStorage.getItem('user')).surName,}
        case EXIT:
            return {...state, email: '', useName: '', surName: ''}
            case CHANGE_NAME:
            return {...state, useName: action.payload}
        case CHANGE_SURNAME:
            return {...state, surName: action.payload}
        default:
            return state;
    }
}