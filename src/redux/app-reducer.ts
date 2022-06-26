import { getAuthInfoThunkCreator } from './auth-reducer';
import { BaseThunkType, InferActionsTypes } from './redux-store';

const initialState = {
  initialized: false,
};

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;

const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'app/SET_INITIALIZED_SUCCESS':
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

export default appReducer;

export const actions = {
  setInitializedSuccess: () =>
    ({
      type: 'app/SET_INITIALIZED_SUCCESS',
    } as const),
};

export type ThunkType = BaseThunkType<ActionsTypes, void>;

export const initializeApp = (): ThunkType => (dispatch) => {
  const promise = dispatch(getAuthInfoThunkCreator());
  Promise.all([promise]).then(() => {
    dispatch(actions.setInitializedSuccess());
  });
};
