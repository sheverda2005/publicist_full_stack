import { CREATE_POST_FINISHED, CREATE_POST_IMG, CREATE_POST_TEXT, CREATE_POST_TITLE, CREATE_POST_TYPE_IMPOTENT, CREATE_POST_HTML_PAGE } from "../types";

const initiaState = {
    title: '',
    text: '',
    img: '',
    htmlPage: '',
    impotent: 'USUALLY',
    
}
export const createPostReducer = (state = initiaState, action)=> {
    switch (action.type) {
        case CREATE_POST_TITLE:
            return {...state, title: action.payload}
        case CREATE_POST_TEXT: 
            return {...state, text: action.payload}
        case CREATE_POST_IMG:
            return {...state, img: action.payload}
        case CREATE_POST_TYPE_IMPOTENT:
            return {...state, impotent: action.payload}
        case CREATE_POST_HTML_PAGE:
            return {...state, htmlPage: action.payload}
        case CREATE_POST_FINISHED:
            return {...state, title: '', text: '', img: '', impotent: 'USUALLY', htmlPage: ''}
        default:
            return state;
    }
}