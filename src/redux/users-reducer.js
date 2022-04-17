import { usersAPI, followAPI } from "../api/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

const initialState = {
  usersData: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        usersData: state.usersData.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: true };
          }
          return user;
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        usersData: state.usersData.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: false };
          }
          return user;
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

export const followSuccess = (userId) => ({
  type: FOLLOW,
  userId: userId,
});

export const unfollowSuccess = (userId) => {
  return {
    type: UNFOLLOW,
    userId: userId,
  };
};

export const setUsers = (users) => {
  return {
    type: SET_USERS,
    users: users,
  };
};

export const setCurrentPage = (currentPage) => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage: currentPage,
  };
};

export const setTotalUsersCount = (totalUsersCount) => {
  return {
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount: totalUsersCount,
  };
};

export const toggleIsFetching = (isFetching) => {
  return {
    type: TOGGLE_IS_FETCHING,
    isFetching: isFetching,
  };
};

export const toggleFollowingProgress = (isFetching, userId) => {
  return {
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching: isFetching,
    userId,
  };
};

// Thunks

export const getUsersThunkCreator = (pageNumber, pageSize) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    usersAPI
      .getUsers(pageNumber, pageSize)
      .then((data) => {
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
        dispatch(setCurrentPage(pageNumber));
      })
      .catch((e) => console.error(e));
  };
};

export const followThunkCreator = (userId) => {
  return (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId));
    followAPI
      .followUser(userId)
      .then((data) => {
        if (data.resultCode === 0) {
          dispatch(followSuccess(userId));
        }
        dispatch(toggleFollowingProgress(false, userId));
      })
      .catch((error) => console.error(error));
  };
};

export const unfollowThunkCreator = (userId) => {
  return (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId));
    followAPI
      .unfollowUser(userId)
      .then((data) => {
        if (data.resultCode === 0) {
          dispatch(unfollowSuccess(userId));
        }
        dispatch(toggleFollowingProgress(false, userId));
      })
      .catch((error) => console.error(error));
  };
};
