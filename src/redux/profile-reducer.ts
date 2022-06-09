import { stopSubmit } from 'redux-form';
import { profileAPI } from '../api/api';
import { PhotosType, PostType, ProfileType } from '../types/types';

const ADD_POST = 'profile/ADD-POST';
const DELETE_POST = 'profile/DELETE_POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const SET_PHOTO = 'profile/SET_PHOTO';
const SET_PROFILE = 'profile/SET_PROFILE';

const initialState = {
  postsData: [
    { id: 0, message: "It's our new program! Hey!" },
    { id: 1, message: 'Hello its me' },
    { id: 2, message: 'Wow there are a lot of posts' },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: '',
};

type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case ADD_POST:
      const newPost = {
        id: state.postsData.length,
        message: action.newPostText,
      };
      return {
        ...state,
        postsData: [newPost, ...state.postsData],
      };
    case DELETE_POST:
      return {
        ...state,
        postsData: [...state.postsData].filter((post) => post.id !== action.postId),
      };
    case SET_USER_PROFILE:
      return { ...state, profile: action.userProfile };
    case SET_STATUS:
      return { ...state, status: action.status };
    case SET_PHOTO:
      return { ...state, profile: { ...(state.profile as ProfileType), photos: action.photos } };
    case SET_PROFILE:
      return { ...state, profile: action.profile };
    default:
      return state;
  }
};

export default profileReducer;

type AddPhotosActionType = {
  type: typeof ADD_POST;
  newPostText: string;
};

export const addPostActionCreator = (newPostText: string): AddPhotosActionType => ({
  type: ADD_POST,
  newPostText,
});

type DeletePostActionType = {
  type: typeof DELETE_POST;
  postId: number;
};

export const deletePost = (postId: number): DeletePostActionType => ({
  type: DELETE_POST,
  postId,
});

type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE;
  userProfile: ProfileType;
};

export const setUserProfile = (userProfile: ProfileType): SetUserProfileActionType => ({
  type: SET_USER_PROFILE,
  userProfile,
});

type SetStatusActionType = {
  type: typeof SET_STATUS;
  status: string;
};

export const setStatus = (status: string): SetStatusActionType => ({
  type: SET_STATUS,
  status: status,
});

type SetPhotoActionType = {
  type: typeof SET_PHOTO;
  photos: PhotosType;
};

export const setPhoto = (photos: PhotosType): SetPhotoActionType => ({
  type: SET_PHOTO,
  photos,
});

type SetProfileActionType = {
  type: typeof SET_PROFILE;
  profile: ProfileType;
};

export const setProfile = (profile: ProfileType): SetProfileActionType => ({
  type: SET_PROFILE,
  profile,
});

export const getStatus = (userId: number) => async (dispatch: any) => {
  const data = await profileAPI.getStatus(userId);
  dispatch(setStatus(data));
};

export const updateStatus = (status: string) => async (dispatch: any) => {
  const data = await profileAPI.updateStatus(status);
  if (data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export const savePhoto = (photo: any) => async (dispatch: any) => {
  const data = await profileAPI.updatePhoto(photo);
  if (data.resultCode === 0) {
    dispatch(setPhoto(data.data.photos));
  }
};

const getInvalidField = (errorMessage: string): Array<string> => {
  const field = errorMessage.split('>')[1];
  const finalField = field.slice(0, field.length - 1).toLowerCase();

  const message = errorMessage.split(' (')[0];

  return [finalField, message];
};

type ContactsErrorMessagesType = {
  [string: string]: string;
};

export const setProfileData = (formData: any) => async (dispatch: any, getState: any) => {
  const userId = getState().auth.userId;
  const data = await profileAPI.setProfile(userId, formData);
  if (data.resultCode === 0) {
    const profile = await profileAPI.getProfile(userId);
    dispatch(setProfile(profile));
  } else {
    const contacts: ContactsErrorMessagesType = {};
    for (let i = 0; i < data.messages.length; i += 1) {
      const [field, message] = getInvalidField(data.messages[i]);
      contacts[field] = message;
    }
    const action = stopSubmit('profile', {
      // _error: data.messages[0],
      contacts,
    });
    dispatch(action);
    return Promise.reject(data.messages[0]);
  }
};
