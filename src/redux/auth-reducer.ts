import { stopSubmit } from 'redux-form';
import { authAPI, securityAPI } from '../api/api';

const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_CAPTCHA_URL = 'auth/SET_CAPTCHA_URL';

const initialState = {
  userId: null as number | null,
  login: null as string | null,
  email: null as string | null,
  isFetching: false,
  isAuth: false,
  captchaUrl: null as string | null,
};

export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case SET_CAPTCHA_URL:
      return {
        ...state,
        captchaUrl: action.captchaUrl,
      };
    default:
      return state;
  }
};

export default authReducer;

type SetAuthUserDataPayloadType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};

type SetAuthUserDataType = {
  type: typeof SET_USER_DATA;
  payload: SetAuthUserDataPayloadType;
};

export const setAuthUserData = (
  userId: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): SetAuthUserDataType => ({
  type: SET_USER_DATA,
  payload: {
    userId,
    email,
    login,
    isAuth,
  },
});

type SetCaptchaUrlType = {
  type: typeof SET_CAPTCHA_URL;
  captchaUrl: string;
};

export const setCaptchaUrl = (captchaUrl: string): SetCaptchaUrlType => ({
  type: SET_CAPTCHA_URL,
  captchaUrl,
});

export const getAuthInfoThunkCreator = () => async (dispatch: any) => {
  const data = await authAPI.me();
  if (data.resultCode === 0) {
    const { id, email, login } = data.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
  // return data;
};

export const login =
  (email: string, password: string, captcha: string, rememberMe: boolean) =>
  async (dispatch: any) => {
    const data = await authAPI.login(email, password, captcha, rememberMe);
    if (data.resultCode === 0) {
      dispatch(getAuthInfoThunkCreator());
    } else if (data.resultCode === 1) {
      const errorText = data.messages.length ? data.messages[0] : 'Incorrect Email or Password';
      const action = stopSubmit('login', {
        _error: errorText,
      });
      dispatch(action);
    } else if (data.resultCode === 10) {
      dispatch(getCaptchaUrl());
    } else {
      alert(data.resultCode + ' ' + data.messages[0]);
    }
  };

export const getCaptchaUrl = () => async (dispatch: any) => {
  const data = await securityAPI.getCaptchaURL();
  const captchaUrl = data.url;
  dispatch(setCaptchaUrl(captchaUrl));
};

export const logout = () => async (dispatch: any) => {
  const data = authAPI.logout();
  if (data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};
