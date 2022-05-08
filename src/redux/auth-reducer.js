import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";

const SET_USER_DATA = "auth/SET_USER_DATA";

const initialState = {
  userId: null,
  login: null,
  email: null,
  isFetching: false,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
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

export const getAuthInfoThunkCreator = () => async (dispatch) => {
  const data = await authAPI.me();
  if (data.resultCode === 0) {
    const { id, email, login } = data.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
  // return data;
};

export const login = (email, password, rememberMe) => async (dispatch) => {
  const data = await authAPI.login(email, password, rememberMe);
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
  } else {
    alert(data.resultCode, data.messages[0]);
  }
};

export const logout = () => async (dispatch) => {
  const data = authAPI.logout();
  if (data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};
