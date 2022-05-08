import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteAccount, exit } from "../../store/actions";

function Account({user, exit, deleteAccount}) {
    const history = useNavigate()
    const url = useLocation();
    function redirect() {
        history('/login')
    }
    return (
        <div className="container p-4">
            <h1>{user.useName + " " + user.surName}</h1>
             <button onClick={()=> history(`${url.pathname}/change`)} className="btn btn-primary mt-3 me-3" >Змінити</button>
             <button onClick={()=> exit(redirect)} className="btn btn-warning mt-3 me-3" >Вийти</button>
             <button onClick={()=> deleteAccount(user.email, redirect)} className="btn btn-danger mt-3 me-3" >Видалити</button>
        </div>
    );
}

const mapStateToProps =  state => ({
    user: state.account.user.user
})

const mapDispatchToProps = {
    exit: exit,
    deleteAccount: deleteAccount
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);