import { GET_NEWS_DAY } from "../types";

const initialState = {
    news : [],
}

export const newsDayReaducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NEWS_DAY:
            return {...state, news: action.payload}
        default:
            return state;
    }
}