import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { email, password, submitLogin } from "../../store/actions";
import Alert from "../Alert";

function Login({ email, password, emailState, passwordState, submitLogin, error }) {
    const history = useNavigate()
    function redirect() {
        history('/account')
    }
    return (
        <div className="container">
            {error ? <Alert error={error} /> : ''}
            <form className="mt-4" onSubmit={(event) => {
                submitLogin(event, emailState, passwordState, redirect)
            }}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Пошта</label>
                    <input value={emailState} onChange={(e) => email(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">Нікому не розповідайте ваш адрес</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Пароль</label>
                    <input value={passwordState} onChange={(e) => password(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

const mapDispatchToProps = {
    email: email,
    password: password,
    submitLogin: submitLogin
}

const mapStateToProps = state => ({
    emailState: state.account.login.email,
    passwordState: state.account.login.password,
    error: state.alert.error.error.error
})


export default connect(mapStateToProps, mapDispatchToProps)(Login);