import { AppStateType } from './redux-store';

export const selectIsAuth = (state: AppStateType) => {
  return state.auth.isAuth;
};

export const selectLogin = (state: AppStateType) => {
  return state.auth.login;
};

export const selectAvatar = (state: AppStateType) => {
  return state.profilePage.profile?.photos.small;
};
