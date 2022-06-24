import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { login } from '../../../redux/auth-reducer';
import { AppStateType } from '../../../redux/redux-store';
import { GetCaptchaUrlType } from '../../../types/api';
import { required } from '../../../utils/validators/validators';
import { Input } from '../../common/forms-controls/forms-controls';
import formStyle from '../../common/forms-controls/forms-controls.module.css';
import s from './login.module.css';

const Captcha: React.FC<GetCaptchaUrlType> = ({ url }) => (
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

type LoginFormOwnPropsType = {
  captchaUrl: string | null;
};

type FormType = InjectedFormProps<FormDataType, LoginFormOwnPropsType> & LoginFormOwnPropsType;

const LoginForm = ({ handleSubmit, error, captchaUrl }: FormType) => {
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

const LoginReduxForm = reduxForm<FormDataType, LoginFormOwnPropsType>({
  form: 'login',
})(LoginForm);

type MapStatePropsType = {
  isAuth: boolean;
  captchaUrl: string | null;
};

type MapDispatchPropsType = {
  login: (email: string, password: string, captcha: string, rememberMe: boolean) => void;
};

type LoginPropsType = MapStatePropsType & MapDispatchPropsType;

type FormDataType = {
  email: string;
  password: string;
  captcha: string;
  rememberMe: boolean;
};

const Login: React.FC<LoginPropsType> = ({ isAuth, login, captchaUrl }) => {
  if (isAuth) {
    return <Navigate to="/profile" />;
  }

  const onSubmit = (formData: FormDataType) => {
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

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
});

// type MapDispatchToPropsType = {
//   login: (email: string, password: string, captcha: string, rememberMe: boolean) => void;
// };

export default connect(mapStateToProps, { login })(Login);
