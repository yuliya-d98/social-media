import { ThunkAction } from 'redux-thunk';
import { getAuthInfoThunkCreator } from './auth-reducer';
import { AppStateType } from './redux-store';

const SET_INITIALIZED_SUCCESS = 'app/SET_INITIALIZED_SUCCESS';

export type InitialStateType = {
  initialized: boolean;
};

const initialState: InitialStateType = {
  initialized: false,
};

type ActionsTypes = InitializedSuccessActionType;

const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsTypes
): InitialStateType => {
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

type InitializedSuccessActionType = {
  type: typeof SET_INITIALIZED_SUCCESS;
};

export const setInitializedSuccess = (): InitializedSuccessActionType => ({
  type: SET_INITIALIZED_SUCCESS,
});

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>;

export const initializeApp = (): ThunkType => (dispatch) => {
  const promise = dispatch(getAuthInfoThunkCreator());
  Promise.all([promise]).then(() => {
    dispatch(setInitializedSuccess());
  });
};
