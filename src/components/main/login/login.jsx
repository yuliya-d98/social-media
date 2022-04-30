import { Field, reduxForm } from 'redux-form';
import { required } from '../../../utils/validators/validators';
import { Input } from '../../common/forms-controls/forms-controls';
import s from './login.module.css';

const LoginForm = (props) => {
    return (
        <form className={s.form} onSubmit={props.handleSubmit}>
            <label className={s.inputLabel} htmlFor="email">Email</label>
            <Field component={Input} validate={[required]} className={s.textInput} type="email" placeholder="email" id="email" name='email' />
            <label className={s.inputLabel} htmlFor="password">Password</label>
            <Field component={Input} validate={[required]} className={s.textInput} type="password" placeholder="password" autoComplete='on' id="password" name='password' />
            <div className={s.buttonsContainer}>
                <Field component={Input} className={s.checkbox} type="checkbox" id="remember-me" name='rememberMe' />
                <label className={s.checkboxLabel} htmlFor="remember-me">Remember me</label>
                <button className={s.button} type="submit">Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const Login = (props) => {

    const onSubmit = (formData) => {
        console.log(formData)
    }

    return (
        <div className={s.container}>
            <h2 className={s.header}>Login</h2>
            <LoginReduxForm onSubmit={onSubmit} />
            <hr className={s.line} />
            <a className={s.link} href="https://social-network.samuraijs.com/" target='_blank' rel="noreferrer">Registration</a>
        </div>
    )
}

export default Login;