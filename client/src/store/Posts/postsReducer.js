import { COUNT_PAGE, DELETE_POST, GET_ALL_POSTS, PAGE, PAGE_NULL } from "../types";

const initialState = {
    posts : [],
    page : 1,
    count: 0,
    loading: false,
}

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POSTS:
            return {...state, posts: state.page > 1 ? state.posts.concat(action.payload) : action.payload}
        case DELETE_POST: 
            return {...state, posts: state.posts.filter(post=> post.id != action.payload)}
        case PAGE:
            return {...state, page: state.page+1}
        case PAGE_NULL:
            return {...state, page: 1}
        case COUNT_PAGE:
            return {...state, count: action.payload}
        default:
            return state;
    }
}