import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { acccountChangeName, acccountChangeSurname, changeAccountNameEndSurname } from "../../store/actions";
import Alert from "../Alert";

function ChangeAccount({name, surName, email, changeName, changeSurname, change, id, error}) {
    const history = useNavigate();
    function redirect() {
        history('/account')
    }
    return (
       <div className="container">
            {error ? <Alert error = {error} /> : ''}
           <form className="mt-4" onSubmit={(event)=> change(event, email, name, surName, id, redirect)} >
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Ім'я</label>
                    <input value={name} onChange={(e)=> changeName(e.target.value)} className="form-control"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Фамілія</label>
                    <input value={surName} onChange={(e)=> changeSurname(e.target.value)}  className="form-control"/>
                </div>
                <button type="submit" className="btn btn-primary">Подати зміни</button>
            </form>
            <button onClick={()=> history('/account')} className="btn btn-secondary mt-3">Назад до аккаунта</button>
       </div>
    );
}

const mapStateToProps = state => ({
    email: state.account.changeUser.email,
    name: state.account.changeUser.useName,
    surName: state.account.changeUser.surName,
    id: state.account.changeUser.id,
    error: state.alert.error.error.error
})

const mapDispatchToProps = {
    changeName: acccountChangeName,
    changeSurname: acccountChangeSurname,
    change: changeAccountNameEndSurname
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeAccount);