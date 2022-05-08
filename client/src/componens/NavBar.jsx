import { NavLink } from 'react-router-dom';

function NavBar({ user }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand" to={'/'} >Sheverda</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to={'/'} >Головна</NavLink>
            </li>
            {user ? <li className="nav-item">
              <NavLink className="nav-link" to={'/create_post'} >Створити пост</NavLink>
            </li> : ''}
            <li className="nav-item">
              <NavLink className="nav-link" to={'/about'} >Про автора</NavLink>
            </li>
          </ul>
          {user ?
            <ul className="navbar-nav me-end mb-2 mb-lg-0">
              <li className="nav-item"><NavLink className="nav-link" to={'/account'} >{user.useName + " " + user.surName}</NavLink></li>
            </ul>
            :
            <ul className="navbar-nav me-end mb-2 mb-lg-0">
              <li className="nav-item"><NavLink className="nav-link" to={'/login'}>Логін</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to={'/register'}>Реєстрація</NavLink></li>
            </ul>
          }
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
