import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";

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

export const getAuthInfoThunkCreator = () => {
  return (dispatch) => {
    authAPI
      .me()
      .then((data) => {
        if (data.resultCode === 0) {
          const { id, email, login } = data.data;
          dispatch(setAuthUserData(id, email, login, true));
        }
      })
      .catch((error) => console.error(error));
  };
};

export const login = (email, password, rememberMe) => (dispatch) => {
  authAPI
    .login(email, password, rememberMe)
    .then((data) => {
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
    })
    .catch((error) => console.error(error));
};

export const logout = () => (dispatch) => {
  authAPI
    .logout()
    .then((data) => {
      if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
      }
    })
    .catch((error) => console.error(error));
};
