import { profileAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

const initialState = {
  postsData: [
    { id: 0, username: "Yuliya", message: "It's our new program! Hey!" },
    { id: 1, username: "Yuliya", message: "Hello its me" },
    { id: 2, username: "Yuliya", message: "Wow there are a lot of posts" },
  ],
  profile: null,
  status: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      const newPost = {
        id: state.postsData.length,
        username: "Yuliya",
        message: action.newPostText,
      };
      return {
        ...state,
        postsData: [newPost, ...state.postsData],
        newPostText: "",
      };
    case SET_USER_PROFILE:
      return { ...state, profile: action.userProfile };
    case SET_STATUS:
      return { ...state, status: action.status };
    default:
      return state;
  }
};

export default profileReducer;

export const addPostActionCreator = (newPostText) => ({
  type: ADD_POST,
  newPostText,
});

export const setUserProfile = (userProfile) => ({
  type: SET_USER_PROFILE,
  userProfile,
});

export const setStatus = (status) => ({
  type: SET_STATUS,
  status: status,
});

export const getStatus = (userId) => {
  return (dispatch) => {
    profileAPI
      .getStatus(userId)
      .then((data) => {
        dispatch(setStatus(data));
      })
      .catch((error) => console.error(error));
  };
};

export const updateStatus = (status) => {
  return (dispatch) => {
    profileAPI
      .updateStatus(status)
      .then((data) => {
        if (data.resultCode === 0) {
          dispatch(setStatus(status));
        }
      })
      .catch((error) => console.error(error));
  };
};
