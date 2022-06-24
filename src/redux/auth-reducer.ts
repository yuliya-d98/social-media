import { FormAction, stopSubmit } from 'redux-form';
import { ThunkAction } from 'redux-thunk';
import { authAPI, securityAPI } from '../api/api';
import { ResultCodesEnum, ResultCodesWithCaptchaEnum } from '../types/api';
import { AppStateType } from './redux-store';

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
type ActionsType = SetAuthUserDataType | SetCaptchaUrlType;

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
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

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;
type ThunkTypeWithForm = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsType | FormAction
>;

export const getAuthInfoThunkCreator = (): ThunkType => async (dispatch) => {
  const data = await authAPI.me();
  if (data.resultCode === ResultCodesEnum.Success) {
    const { id, email, login } = data.data;
    dispatch(setAuthUserData(id, email, login, true));
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
  dispatch(setCaptchaUrl(captchaUrl));
};

export const logout = (): ThunkType => async (dispatch) => {
  const data = await authAPI.logout();
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};
