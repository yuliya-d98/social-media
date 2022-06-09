import { getAuthInfoThunkCreator } from './auth-reducer';

const SET_INITIALIZED_SUCCESS = 'app/SET_INITIALIZED_SUCCESS';

export type InitialStateType = {
  initialized: boolean;
};

const initialState: InitialStateType = {
  initialized: false,
};

const appReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
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

export const initializeApp = () => (dispatch: any) => {
  const promise = dispatch(getAuthInfoThunkCreator());
  Promise.all([promise]).then(() => {
    dispatch(setInitializedSuccess());
  });
};
