import { profileAPI } from "../api/api";

const ADD_POST = "profile/ADD-POST";
const DELETE_POST = "profile/DELETE_POST";
const SET_USER_PROFILE = "profile/SET_USER_PROFILE";
const SET_STATUS = "profile/SET_STATUS";

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
    case DELETE_POST:
      return {
        ...state,
        postsData: [...state.postsData].filter(
          (post) => post.id !== action.postId
        ),
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

export const deletePost = (postId) => ({
  type: DELETE_POST,
  postId,
});

export const setUserProfile = (userProfile) => ({
  type: SET_USER_PROFILE,
  userProfile,
});

export const setStatus = (status) => ({
  type: SET_STATUS,
  status: status,
});

export const getStatus = (userId) => async (dispatch) => {
  const data = await profileAPI.getStatus(userId);
  dispatch(setStatus(data));
};

export const updateStatus = (status) => async (dispatch) => {
  const data = await profileAPI.updateStatus(status);
  if (data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};
