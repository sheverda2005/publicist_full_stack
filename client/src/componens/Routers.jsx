import {Routes, Route} from 'react-router-dom'
import Home from './Home';
import About from './About';
import Account from './Account/Account';
import Login from './Account/Login';
import Register from './Account/Register';
import ChangeAccount from './Account/ChangeAccount';
import CreatePost from './Posts/CreatePost';
import ErrorWepPage from './ErrorWepPage';
import PagePost from './Posts/PostPage';

function Routers({user}) {
    if (user) {
        return (
            <Routes>
                <Route  path='/' element={<Home/>} ></Route>
                <Route path='/about' element={<About/>} ></Route>
                <Route path ='/account' element={<Account/>} ></Route>
                <Route path ='/create_post' element={<CreatePost/>} ></Route>
                <Route path ='/account/change' element={<ChangeAccount/>} ></Route>
                <Route path ="/post/page/:id" element={<PagePost/>} ></Route>
                <Route path ="*" element={<ErrorWepPage/>} ></Route>
            </Routes>
            );
    }
    return (
        <Routes>
            <Route  path='/' element={<Home/>} ></Route>
            <Route path='/about' element={<About/>} ></Route>
            <Route path='/login' element={<Login/>} ></Route>
            <Route path='/register' element={<Register/>} ></Route>
            <Route path ="/post/page/:id" element={<PagePost/>} ></Route>
            <Route path ="*" element={<ErrorWepPage/>} ></Route>
        </Routes>
        );
}

export default Routers;