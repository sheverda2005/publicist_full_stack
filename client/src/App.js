import {BrowserRouter as Router} from 'react-router-dom'
import NavBar from './componens/NavBar';
import Routers from './componens/Routers';
import {connect} from 'react-redux'
import { getAllPosts, getImpotentPosts, getNewsDay, getUsuallyPosts, verify } from './store/actions';
import { useEffect } from 'react';

function App({user, verify, getUsually, page, pageStateImpotent, getImpotent,  getNewsDay}) {
  useEffect(()=> {
    if (user) {
      verify(user)
    }
    getNewsDay()
  }, [])

  
  useEffect(()=> {
    getUsually(page)
  }, [page])

  useEffect(()=> {
    getImpotent(pageStateImpotent)
  }, [pageStateImpotent])
  return (
    <div className="App">
      <Router>
        <NavBar user = {user} />
        <Routers user = {user} />
      </Router>
    </div>
  );
}

const mapStateToProps = state => ({
   user: state.account.user.user,
   page: state.posts.posts.page,
   pageStateImpotent: state.posts.postImpotent.page,
   loading: state.loading.loading
})
const mapDispatchToProps = {
   verify,
   getUsually: getUsuallyPosts,
   getImpotent: getImpotentPosts,
   getNewsDay: getNewsDay
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
