import { createSelector } from 'reselect';
import { AppStateType } from './redux-store';

const getUsersDataSelector = (state: AppStateType) => {
  return state.usersPage.usersData;
};

export const getUsersData = createSelector(getUsersDataSelector, (users) => {
  return users.filter(() => true);
});

export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize;
};

export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalUsersCount;
};

export const getUsersFilter = (state: AppStateType) => {
  return state.usersPage.filter;
};

export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage;
};

export const getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching;
};

export const getFollowingInProgress = (state: AppStateType) => {
  return state.usersPage.followingInProgress;
};
