import { FormAction, stopSubmit } from 'redux-form';
import { authAPI } from '../api/authAPI';
import { securityAPI } from '../api/securityAPI';
import { ResultCodesEnum, ResultCodesWithCaptchaEnum } from '../types/api';
import { BaseThunkType, InferActionsTypes } from './redux-store';

const initialState = {
  userId: null as number | null,
  login: null as string | null,
  email: null as string | null,
  isFetching: false,
  isAuth: false,
  captchaUrl: null as string | null,
};

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'auth/SET_USER_DATA':
      return {
        ...state,
        ...action.payload,
      };
    case 'auth/SET_CAPTCHA_URL':
      return {
        ...state,
        captchaUrl: action.captchaUrl,
      };
    default:
      return state;
  }
};

export default authReducer;

export const actions = {
  setAuthUserData: (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) =>
    ({
      type: 'auth/SET_USER_DATA',
      payload: {
        userId,
        email,
        login,
        isAuth,
      },
    } as const),

  setCaptchaUrl: (captchaUrl: string) =>
    ({
      type: 'auth/SET_CAPTCHA_URL',
      captchaUrl,
    } as const),
};

type ThunkType = BaseThunkType<ActionsTypes>;
type ThunkTypeWithForm = BaseThunkType<ActionsTypes | FormAction>;

export const getAuthInfoThunkCreator = (): ThunkType => async (dispatch) => {
  const data = await authAPI.me();
  if (data.resultCode === ResultCodesEnum.Success) {
    const { id, email, login } = data.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
  }
  // return data;
};

export const login =
  (email: string, password: string, captcha: string, rememberMe: boolean): ThunkTypeWithForm =>
  async (dispatch) => {
    const data = await authAPI.login(email, password, captcha, rememberMe);
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(getAuthInfoThunkCreator());
    } else if (data.resultCode === ResultCodesEnum.Error) {
      const errorText = data.messages.length ? data.messages[0] : 'Incorrect Email or Password';
      const action = stopSubmit('login', {
        _error: errorText,
      });
      dispatch(action);
    } else if (data.resultCode === ResultCodesWithCaptchaEnum.CaptchaIsRequired) {
      dispatch(getCaptchaUrl());
    } else {
      alert(data.resultCode + ' ' + data.messages[0]);
    }
  };

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const data = await securityAPI.getCaptchaURL();
  const captchaUrl = data.url;
  dispatch(actions.setCaptchaUrl(captchaUrl));
};

export const logout = (): ThunkType => async (dispatch) => {
  const data = await authAPI.logout();
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};
