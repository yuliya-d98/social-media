import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api";

const ADD_POST = "profile/ADD-POST";
const DELETE_POST = "profile/DELETE_POST";
const SET_USER_PROFILE = "profile/SET_USER_PROFILE";
const SET_STATUS = "profile/SET_STATUS";
const SET_PHOTO = "profile/SET_PHOTO";
const SET_PROFILE = "profile/SET_PROFILE";

const initialState = {
  postsData: [
    { id: 0, message: "It's our new program! Hey!" },
    { id: 1, message: "Hello its me" },
    { id: 2, message: "Wow there are a lot of posts" },
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
    case SET_PHOTO:
      return { ...state, profile: { ...state.profile, photos: action.photos } };
    case SET_PROFILE:
      return { ...state, profile: action.profile };
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

export const setPhoto = (photos) => ({
  type: SET_PHOTO,
  photos,
});

export const setProfile = (profile) => ({
  type: SET_PROFILE,
  profile,
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

export const savePhoto = (photo) => async (dispatch) => {
  const data = await profileAPI.updatePhoto(photo);
  if (data.resultCode === 0) {
    dispatch(setPhoto(data.data.photos));
  }
};

const getInvalidField = (errorMessage) => {
  const field = errorMessage.split(">")[1];
  const finalField = field.slice(0, field.length - 1).toLowerCase();

  const message = errorMessage.split(" (")[0];

  return [finalField, message];
};

export const setProfileData = (formData) => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  const data = await profileAPI.setProfile(userId, formData);
  if (data.resultCode === 0) {
    const profile = await profileAPI.getProfile(userId);
    dispatch(setProfile(profile));
  } else {
    const contacts = {};
    for (let i = 0; i < data.messages.length; i += 1) {
      const [field, message] = getInvalidField(data.messages[i]);
      contacts[field] = message;
    }
    const action = stopSubmit("profile", {
      // _error: data.messages[0],
      contacts,
      // contacts: {
      //   [field]: message,
      // },
    });
    dispatch(action);
    return Promise.reject(data.messages[0]);
  }
};
