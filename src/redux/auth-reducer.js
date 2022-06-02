import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = "auth/SET_USER_DATA";
const SET_CAPTCHA_URL = "auth/SET_CAPTCHA_URL";

const initialState = {
  userId: null,
  login: null,
  email: null,
  isFetching: false,
  isAuth: false,
  captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
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

export const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: {
    userId,
    email,
    login,
    isAuth,
  },
});

export const setCaptchaUrl = (captchaUrl) => ({
  type: SET_CAPTCHA_URL,
  captchaUrl,
});

export const getAuthInfoThunkCreator = () => async (dispatch) => {
  const data = await authAPI.me();
  if (data.resultCode === 0) {
    const { id, email, login } = data.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
  // return data;
};

export const login =
  (email, password, captcha, rememberMe) => async (dispatch) => {
    const data = await authAPI.login(email, password, captcha, rememberMe);
    if (data.resultCode === 0) {
      dispatch(getAuthInfoThunkCreator());
    } else if (data.resultCode === 1) {
      const errorText = data.messages.length
        ? data.messages[0]
        : "Incorrect Email or Password";
      const action = stopSubmit("login", {
        _error: errorText,
      });
      dispatch(action);
    } else if (data.resultCode === 10) {
      dispatch(getCaptchaUrl());
    } else {
      alert(data.resultCode, data.messages[0]);
    }
  };

export const getCaptchaUrl = () => async (dispatch) => {
  const data = await securityAPI.getCaptchaURL();
  const captchaUrl = data.url;
  dispatch(setCaptchaUrl(captchaUrl));
};

export const logout = () => async (dispatch) => {
  const data = authAPI.logout();
  if (data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};
