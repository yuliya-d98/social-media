import { getAuthInfoThunkCreator } from "./auth-reducer";

const SET_INITIALIZED_SUCCESS = "SET_INITIALIZED_SUCCESS";

const initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

export default appReducer;

export const setInitializedSuccess = () => ({
  type: SET_INITIALIZED_SUCCESS,
});

export const initializeApp = () => (dispatch) => {
  const promise = dispatch(getAuthInfoThunkCreator());
  Promise.all([promise]).then(() => {
    dispatch(setInitializedSuccess());
  });
};
