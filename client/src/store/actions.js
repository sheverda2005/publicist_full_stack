import { CREATE_POST_FINISHED, EXIT, EMAIL, VERIFY_TRUE, PASSWORD, ERROR, ERROR_HIDE, FINISHED_SUCCESS, REGISTER_EMAIL, REGISTER_PASSWORD, REGISTER_NAME, REGISTER_SURNAME, FINISHED_REGISTER, DELETE_ACCOUNT, CHANGE_NAME, CHANGE_SURNAME, CREATE_POST_TITLE, CREATE_POST_TEXT, DONE_ALERT, HIDE_DONE_ALERT, GET_ALL_POSTS, DELETE_POST, PAGE, COUNT_PAGE, PAGE_NULL, LOADING_TRUE, LOADING_FALSE, CREATE_POST_IMG, CREATE_POST_TYPE_IMPOTENT, GET_NEWS_DAY, GET_ALL_POSTS_IMPOTENT, COUNT_PAGE_IMPOTENT, PAGE_IMPOTENT, PAGE_NULL_IMPOTENT, DELETE_POST_IMPOTENT, CREATE_POST_HTML_PAGE,} from "./types";

export function verify(user) {
    return async dispatch => {
        const req =  await fetch("https://newssitebackend.herokuapp.com/verify", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(user)
        })
        const res = await req.json()
        if (req.ok) {
            dispatch(verifyTrue(res))
            return;
        }
        localStorage.removeItem('user')
    }
}

export function submitLogin(event, email, password, redirect) {
    event.preventDefault()
    return async dispatch => {
        const request = await fetch("https://newssitebackend.herokuapp.com/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({email, password})
        })
        const responce = await request.json()
        if (request.ok) {
            localStorage.setItem('user', JSON.stringify(responce))
            dispatch(verifyTrue(responce))
            dispatch(finishedLoginSUCCESS())
            redirect()
            return;
        }
        dispatch(showAlert(responce))
        setTimeout(()=> {
            dispatch(hideAlert())
        }, 1500)
    }
}

export function submitRegister(event, user, redirect) {
    event.preventDefault()
    return async dispatch => {
        const {email, password, useName, surName} = user
        if (email.trim().length === 0 || password.trim().length === 0 || useName.trim().length === 0 || surName.length === 0) {
            dispatch(showAlert({error: 'Всі поля мають бути заповнені'}))
            setTimeout(()=> {
                dispatch(hideAlert())
            }, 1500)
            return;
        }
        const request = await fetch("https://newssitebackend.herokuapp.com/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(user)
        })
        const responce = await request.json()
        if (request.ok) {
            localStorage.setItem('user', JSON.stringify(responce))
            dispatch(verifyTrue(responce))
            dispatch(finishedRegister())
            redirect()
            return;
        }
        dispatch(showAlert(responce))
        setTimeout(()=> {
            dispatch(hideAlert())
        }, 1500)
    }
}
export function deleteAccount(email, redirect) {
     return async dispatch => {
         const req = await fetch('https://newssitebackend.herokuapp.com/deleteAccount', {
             method: 'DELETE',
             headers: {
                'Content-Type': 'application/json'
             },
             body: JSON.stringify({email})
         })
         const res = await req.json()
         localStorage.removeItem('user')
         dispatch({type: DELETE_ACCOUNT})
         redirect()
         dispatch(showAlert(res))
         setTimeout(()=> {
             dispatch(hideAlert())
         }, 1500)
         return;
     }
}

export function changeAccountNameEndSurname(event, email, useName, surName, id, redirect) {
    event.preventDefault()
    return async dispatch => {
        if (useName.trim().length === 0 || surName.length === 0) {
            dispatch(showAlert({error: 'Всі поля мають бути заповнені'}))
            setTimeout(()=> {
                dispatch(hideAlert())
            }, 1500)
            return;
        }
        if (useName.trim().length === 0 || surName.length === 0) {
            dispatch(showAlert({error: 'Всі поля мають бути заповнені'}))
            setTimeout(()=> {
                dispatch(hideAlert())
            }, 1500)
            return;
        }
        const req = await fetch('https://newssitebackend.herokuapp.com/putUser', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, useName, surName})
        })
        const res = await req.json()
        if (res) {
            localStorage.setItem('user', JSON.stringify({id, email, useName, surName}))
            dispatch(verifyTrue({id, email, useName, surName}))
            redirect()
            return;
        }
    }
}

export function submitCreatePost(event, title, text, img, impotent, htmlPage) {
    event.preventDefault()
    return async dispatch => {
        if (title.trim().length === 0 || text.trim().length === 0 || img.trim().length === 0 || htmlPage.trim().length === 0) {
            dispatch(showAlert({error: 'Всі поля мають бути заповнені'}))
            setTimeout(()=> {
                dispatch(hideAlert())
            }, 1500)
            return;
        }
        const autor = localStorage.getItem('user')
        const request = await fetch('https://newssitebackend.herokuapp.com/create_post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, text, img, impotent, autor, htmlPage})
        })
        const responce = await request.json()
        if (request.ok) {
            dispatch({type: CREATE_POST_FINISHED})
            dispatch({type: DONE_ALERT, payload: "Пост створений"})
            if (impotent === "USUALLY") {
                dispatch(getUsuallyPosts())
                dispatch({type: PAGE_NULL})
            }
            if (impotent === "IMPOTENT_NEWS") {
                dispatch(getImpotentPosts())
                dispatch({type: PAGE_NULL_IMPOTENT})
            }
            if (impotent === "NEWS_DAY") {
                dispatch(getNewsDay())
            }
            setTimeout(()=> {
                dispatch({type: HIDE_DONE_ALERT})
            }, 1500)
           return;
        } else {
            dispatch(showAlert({error: 'Щось пішло не так'}))
            setTimeout(()=> {
                dispatch(hideAlert())
            }, 1500)
            return;
        }
    }
}

export function getUsuallyPosts(page) {
    return async dispatch => {
        dispatch({type: LOADING_TRUE})
        const req = await fetch(`https://newssitebackend.herokuapp.com/get_posts_usually?page=${page}`)
        const res = await req.json()
        if (req.ok) {
            dispatch({type: LOADING_FALSE})
            dispatch({type: COUNT_PAGE, payload: res.count})
            dispatch({type: GET_ALL_POSTS, payload: res.posts})
            return;
        } else {
            dispatch({type: LOADING_FALSE})
            dispatch(showAlert({error: 'Щось пішло не так'}))
            setTimeout(()=> {
                dispatch(hideAlert())
            }, 1500)
            return;
        }
    }
}

export function getImpotentPosts(page) {
    return async dispatch => {
        dispatch({type: LOADING_TRUE})
        const req = await fetch(`https://newssitebackend.herokuapp.com/get_posts_impotent?page=${page}`)
        const res = await req.json()
        if (req.ok) {
            dispatch({type: LOADING_FALSE})
            dispatch({type: COUNT_PAGE_IMPOTENT, payload: res.count})
            dispatch({type: GET_ALL_POSTS_IMPOTENT, payload: res.posts})
            return;
        } else {
            dispatch({type: LOADING_FALSE})
            dispatch(showAlert({error: 'Щось пішло не так'}))
            setTimeout(()=> {
                dispatch(hideAlert())
            }, 1500)
            return;
        }
    }
}

export function getNewsDay() {
    return async dispatch => {
        dispatch({type: LOADING_TRUE})
        const req = await fetch(`https://newssitebackend.herokuapp.com/get_posts_news_day`)
        const res = await req.json()
        if (req.ok) {
            dispatch({type: LOADING_FALSE})
            dispatch({type: GET_NEWS_DAY, payload: res.posts})
            return;
        } else {
            dispatch({type: LOADING_FALSE})
            dispatch(showAlert({error: 'Щось пішло не так'}))
            setTimeout(()=> {
                dispatch(hideAlert())
            }, 1500)
            return;
        }
    }
}
export function deletePost(id) {
    return  dispatch => {
        fetch('https://newssitebackend.herokuapp.com/delete_post', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id, impotent: 'USUALLY'})
        })
        return dispatch({type: DELETE_POST, payload: id})
    }
}

export function deletePostImpotent(id) {
    return  dispatch => {
        fetch('https://newssitebackend.herokuapp.com/delete_post', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id, impotent: 'IMPOTENT_NEWS'})
        })
        return dispatch({type: DELETE_POST_IMPOTENT, payload: id})
    }
}

export function acccountChangeName(value) {
    return {
        type: CHANGE_NAME,
        payload: value
    }
}

export function acccountChangeSurname(value) {
    return {
        type: CHANGE_SURNAME,
        payload: value
    }
}


export function verifyTrue(user) {
    return {
        type: VERIFY_TRUE,
        payload: user
    }
}

export function email(value) {
    return {
        type: EMAIL,
        payload: value
    }
}

export function password(value) {
    return {
        type: PASSWORD,
        payload: value
    }
}

export function emailRegister(value) {
    return {
        type: REGISTER_EMAIL,
        payload: value
    }
}

export function passwordRegister(value) {
    return {
        type: REGISTER_PASSWORD,
        payload: value
    }
}

export function nameRegister(value) {
    return {
        type: REGISTER_NAME,
        payload: value
    }
}

export function surnameRegister(value) {
    return {
        type: REGISTER_SURNAME,
        payload: value
    }
}

export function finishedRegister() {
    return {
        type: FINISHED_REGISTER
    }
}

export function showAlert(value) {
    return {
        type: ERROR,
        payload: value
    }
}

export function hideAlert() {
    return {
        type: ERROR_HIDE,
    }
}

export function finishedLoginSUCCESS() {
    return {
        type: FINISHED_SUCCESS
    }
}

export function exit (redirect) {
    localStorage.removeItem('user')
    redirect()
    return {
        type: EXIT
    }
}

export function createPostTitle(value) {
    return {
        type: CREATE_POST_TITLE,
        payload: value
    }
}

export function createPostText(value) {
    return {
        type: CREATE_POST_TEXT,
        payload: value
    }
}

export function createPostImg(value) {
    return {
        type: CREATE_POST_IMG,
        payload: value
    }
}

export function createPostHTML(value) {
    return {
        type: CREATE_POST_HTML_PAGE,
        payload: value
    }
}

export function createPostImpotent(value) {
    return {
        type: CREATE_POST_TYPE_IMPOTENT,
        payload: value
    }
}



export function page() {
    return {
        type: PAGE
    }
}

export function pageImpotent() {
    return {
        type: PAGE_IMPOTENT
    }
}
