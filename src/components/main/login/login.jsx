import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { required } from '../../../utils/validators/validators';
import { Input } from '../../common/forms-controls/forms-controls';
import s from './login.module.css';
import formStyle from '../../common/forms-controls/forms-controls.module.css';
import { login } from '../../../redux/auth-reducer';
import { Navigate } from 'react-router-dom';

const Captcha = ({ url }) => (
  <div>
    <img src={url} alt="captcha" className={s.captchaImage} />
    <Field
      component={Input}
      validate={[required]}
      className={s.textInput}
      type="text"
      placeholder="Symbols from image"
      autoComplete="on"
      id="captcha"
      name="captcha"
    />
  </div>
);

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.inputLabel} htmlFor="email">
        Email
      </label>
      <Field
        component={Input}
        validate={[required]}
        className={s.textInput}
        type="email"
        placeholder="email"
        id="email"
        name="email"
      />
      <label className={s.inputLabel} htmlFor="password">
        Password
      </label>
      <Field
        component={Input}
        validate={[required]}
        className={s.textInput}
        type="password"
        placeholder="password"
        autoComplete="on"
        id="password"
        name="password"
      />
      {captchaUrl && <Captcha url={captchaUrl} />}
      <div className={s.buttonsContainer}>
        <Field
          component="input"
          className={formStyle.checkbox}
          type="checkbox"
          id="remember-me"
          name="rememberMe"
        />
        <label className={formStyle.checkboxLabel} htmlFor="remember-me">
          Remember me
        </label>
        <button className={formStyle.button} type="submit">
          Login
        </button>
      </div>
      {error && <p className={formStyle.formSummaryError}>{error}</p>}
    </form>
  );
};

const LoginReduxForm = reduxForm({
  form: 'login',
})(LoginForm);

const Login = ({ isAuth, login, captchaUrl }) => {
  if (isAuth) {
    return <Navigate to="/profile" />;
  }

  const onSubmit = (formData) => {
    login(formData.email, formData.password, formData.captcha, formData.rememberMe);
  };

  return (
    <div className={s.container}>
      <h2 className={s.header}>Login</h2>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
      <hr className={s.line} />
      <a
        className={s.link}
        href="https://social-network.samuraijs.com/"
        target="_blank"
        rel="noreferrer"
      >
        Registration
      </a>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps, { login })(Login);
