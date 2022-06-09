import { followAPI, usersAPI } from '../api/api';
import { UserType } from '../types/types';
import { updateObjectInArray } from '../utils/objects-helpers';

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS';

const initialState = {
  usersData: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>, // array of userId's
};

type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        usersData: updateObjectInArray(state.usersData, action.userId, 'id', {
          followed: true,
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        usersData: updateObjectInArray(state.usersData, action.userId, 'id', {
          followed: false,
        }),
      };
    case SET_USERS:
      return { ...state, usersData: action.users };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };
    case SET_TOTAL_USERS_COUNT:
      return { ...state, totalUsersCount: action.totalUsersCount };
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    default:
      return state;
  }
};

export default usersReducer;

type FollowSuccessActionType = {
  type: typeof FOLLOW;
  userId: number;
};

export const followSuccess = (userId: number): FollowSuccessActionType => ({
  type: FOLLOW,
  userId,
});

type UnfollowSuccessActionType = {
  type: typeof UNFOLLOW;
  userId: number;
};

export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => {
  return {
    type: UNFOLLOW,
    userId,
  };
};

type SetUsersActionType = {
  type: typeof SET_USERS;
  users: Array<UserType>;
};

export const setUsers = (users: Array<UserType>): SetUsersActionType => {
  return {
    type: SET_USERS,
    users,
  };
};

type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
};

export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage: currentPage,
  };
};

type SetTotalUsersCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT;
  totalUsersCount: number;
};

export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => {
  return {
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount,
  };
};

type ToggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
};

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => {
  return {
    type: TOGGLE_IS_FETCHING,
    isFetching: isFetching,
  };
};

type ToggleFollowingProgressActionType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS;
  isFetching: boolean;
  userId: number;
};

export const toggleFollowingProgress = (
  isFetching: boolean,
  userId: number
): ToggleFollowingProgressActionType => {
  return {
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching: isFetching,
    userId,
  };
};

// Thunks

export const getUsersThunkCreator = (pageNumber: number, pageSize: number) => async (dispatch) => {
  dispatch(toggleIsFetching(true));
  const data = await usersAPI.getUsers(pageNumber, pageSize);
  dispatch(toggleIsFetching(false));
  dispatch(setUsers(data.items));
  dispatch(setTotalUsersCount(data.totalCount));
  dispatch(setCurrentPage(pageNumber));
};

const followUnfollowFlow = async (dispatch, userId: number, apiMethod, actionCreator) => {
  dispatch(toggleFollowingProgress(true, userId));
  const data = await apiMethod(userId);
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
};

export const followThunkCreator = (userId: number) => async (dispatch) => {
  const apiMethod = followAPI.followUser.bind(followAPI);
  await followUnfollowFlow(dispatch, userId, apiMethod, followSuccess);
};

export const unfollowThunkCreator = (userId: number) => async (dispatch) => {
  const apiMethod = followAPI.unfollowUser.bind(followAPI);
  await followUnfollowFlow(dispatch, userId, apiMethod, unfollowSuccess);
};
