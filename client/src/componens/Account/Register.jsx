import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { emailRegister, nameRegister, passwordRegister, submitRegister, surnameRegister } from "../../store/actions";
import Alert from "../Alert";

function Register({email, password, userName, surName, submit, user, error}) {
    const history = useNavigate()
    function redirect() {
        history('/account')
    }
    return (
        <div className="container">
            {error ? <Alert error = {error} /> : ''}
            <form className="mt-4" onSubmit={(event) => submit(event, user, redirect)}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Пошта</label>
                    <input value={user.email} onChange={(e)=> email(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">Нікому не розповідайте ваш адрес</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Ім'я</label>
                    <input value={user.useName} onChange={(e)=> userName(e.target.value)} className="form-control"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Фамілія</label>
                    <input value={user.surName} onChange={(e)=> surName(e.target.value)} className="form-control"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Пароль</label>
                    <input  value={user.password} onChange={(e)=> password(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

const mapDispatchToProps = {
    email: emailRegister,
    password: passwordRegister,
    userName: nameRegister,
    surName: surnameRegister,
    submit: submitRegister,
}

const mapStateToProps = state => ({
    user: state.account.register,
    error: state.alert.error.error.error
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);