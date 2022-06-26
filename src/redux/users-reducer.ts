import { Dispatch } from 'react';
import { followAPI } from '../api/followAPI';
import { usersAPI } from '../api/usersAPI';
import { CommonResponceType, ResultCodesEnum } from '../types/api';
import { UserType } from '../types/types';
import { updateObjectInArray } from '../utils/objects-helpers';
import { BaseThunkType, InferActionsTypes } from './redux-store';

const initialState = {
  usersData: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>, // array of userId's
};

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'users/FOLLOW':
      return {
        ...state,
        usersData: updateObjectInArray(state.usersData, action.userId, 'id', {
          followed: true,
        }),
      };
    case 'users/UNFOLLOW':
      return {
        ...state,
        usersData: updateObjectInArray(state.usersData, action.userId, 'id', {
          followed: false,
        }),
      };
    case 'users/SET_USERS':
      return { ...state, usersData: action.users };
    case 'users/SET_CURRENT_PAGE':
      return { ...state, currentPage: action.currentPage };
    case 'users/SET_TOTAL_USERS_COUNT':
      return { ...state, totalUsersCount: action.totalUsersCount };
    case 'users/TOGGLE_IS_FETCHING':
      return { ...state, isFetching: action.isFetching };
    case 'users/TOGGLE_IS_FOLLOWING_PROGRESS':
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

export const actions = {
  followSuccess: (userId: number) =>
    ({
      type: 'users/FOLLOW',
      userId,
    } as const),

  unfollowSuccess: (userId: number) =>
    ({
      type: 'users/UNFOLLOW',
      userId,
    } as const),

  setUsers: (users: Array<UserType>) =>
    ({
      type: 'users/SET_USERS',
      users,
    } as const),

  setCurrentPage: (currentPage: number) =>
    ({
      type: 'users/SET_CURRENT_PAGE',
      currentPage: currentPage,
    } as const),

  setTotalUsersCount: (totalUsersCount: number) =>
    ({
      type: 'users/SET_TOTAL_USERS_COUNT',
      totalUsersCount,
    } as const),

  toggleIsFetching: (isFetching: boolean) =>
    ({
      type: 'users/TOGGLE_IS_FETCHING',
      isFetching: isFetching,
    } as const),

  toggleFollowingProgress: (isFetching: boolean, userId: number) =>
    ({
      type: 'users/TOGGLE_IS_FOLLOWING_PROGRESS',
      isFetching: isFetching,
      userId,
    } as const),
};

// Thunks

type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = BaseThunkType<ActionsTypes>;

export const getUsersThunkCreator =
  (pageNumber: number, pageSize: number) => async (dispatch: DispatchType) => {
    dispatch(actions.toggleIsFetching(true));
    const data = await usersAPI.getUsers(pageNumber, pageSize);
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
    dispatch(actions.setCurrentPage(pageNumber));
  };

const followUnfollowFlow = async (
  dispatch: DispatchType,
  userId: number,
  apiMethod: (userId: number) => Promise<CommonResponceType>,
  actionCreator: (
    userId: number
  ) => ReturnType<typeof actions.followSuccess> | ReturnType<typeof actions.unfollowSuccess>
) => {
  dispatch(actions.toggleFollowingProgress(true, userId));
  const data = await apiMethod(userId);
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.toggleFollowingProgress(false, userId));
};

export const followThunkCreator =
  (userId: number): ThunkType =>
  async (dispatch) => {
    const apiMethod = followAPI.followUser.bind(followAPI);
    await followUnfollowFlow(dispatch, userId, apiMethod, actions.followSuccess);
  };

export const unfollowThunkCreator =
  (userId: number): ThunkType =>
  async (dispatch) => {
    const apiMethod = followAPI.unfollowUser.bind(followAPI);
    await followUnfollowFlow(dispatch, userId, apiMethod, actions.unfollowSuccess);
  };
