import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk"
import { errorReducer } from "./Alert/errorReducer";
import { loginReducer } from "./Account/loginReducer";
import { registerReducer } from "./Account/registerReducer";
import { changeUserReduser } from "./Account/changeUserReducer";
import { createPostReducer } from "./Posts/createPostReducer";
import {doneAlertReducer} from "./Alert/doneAlertReducer"
import { postsReducer } from "./Posts/postsReducer";
import { newsDayReaducer } from "./Posts/newsDayReducer";
import {userReducer} from "./Account/userReducer"
import { loadingReducer } from "./Loading/loadingReducer";
import { impotentPostReducer } from "./Posts/impotentPostsReducer";


const account = combineReducers({
    user: userReducer,
    login: loginReducer,
    register: registerReducer,
    changeUser: changeUserReduser,
})

const posts = combineReducers({
    createPost: createPostReducer,
    posts: postsReducer,
    newsDay: newsDayReaducer,
    postImpotent: impotentPostReducer
})

const alert = combineReducers({
    error: errorReducer,
    doneAlert: doneAlertReducer,
})

const rootReducer = combineReducers({
    account,
    alert,
    loading: loadingReducer,
    posts,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
