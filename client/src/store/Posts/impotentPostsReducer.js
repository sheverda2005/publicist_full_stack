import { COUNT_PAGE_IMPOTENT, DELETE_POST_IMPOTENT, GET_ALL_POSTS_IMPOTENT, PAGE_IMPOTENT, PAGE_NULL_IMPOTENT } from "../types"

const initialState = {
    posts : [],
    page : 1,
    count: 0
}

export const impotentPostReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POSTS_IMPOTENT:
            return {...state, posts: state.page > 1 ? state.posts.concat(action.payload) : action.payload}
        case DELETE_POST_IMPOTENT: 
            return {...state, posts: state.posts.filter(post=> post.id != action.payload)}
        case PAGE_IMPOTENT:
            return {...state, page: state.page+1}
        case PAGE_NULL_IMPOTENT:
            return {...state, page: 1}
        case COUNT_PAGE_IMPOTENT:
            return {...state, count: action.payload}
        default:
            return state;
    }
}