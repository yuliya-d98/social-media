import { FormAction, stopSubmit } from 'redux-form';
import { profileAPI } from '../api/profileAPI';
import { ResultCodesEnum } from '../types/api';
import { PhotosType, PostType, ProfileType } from '../types/types';
import { BaseThunkType, InferActionsTypes } from './redux-store';

const initialState = {
  postsData: [
    { id: 0, message: "It's our new program! Hey!" },
    { id: 1, message: 'Hello its me' },
    { id: 2, message: 'Wow there are a lot of posts' },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: '' as string | null,
};

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'profile/ADD-POST':
      const newPost = {
        id: state.postsData.length,
        message: action.newPostText,
      };
      return {
        ...state,
        postsData: [newPost, ...state.postsData],
      };
    case 'profile/DELETE_POST':
      return {
        ...state,
        postsData: [...state.postsData].filter((post) => post.id !== action.postId),
      };
    case 'profile/SET_USER_PROFILE':
      return { ...state, profile: action.userProfile };
    case 'profile/SET_STATUS':
      return { ...state, status: action.status };
    case 'profile/SET_PHOTO':
      return { ...state, profile: { ...(state.profile as ProfileType), photos: action.photos } };
    case 'profile/SET_PROFILE':
      return { ...state, profile: action.profile };
    default:
      return state;
  }
};

export default profileReducer;

export const actions = {
  addPostActionCreator: (newPostText: string) =>
    ({
      type: 'profile/ADD-POST',
      newPostText,
    } as const),

  deletePost: (postId: number) =>
    ({
      type: 'profile/DELETE_POST',
      postId,
    } as const),

  setUserProfile: (userProfile: ProfileType) =>
    ({
      type: 'profile/SET_USER_PROFILE',
      userProfile,
    } as const),

  setStatus: (status: string | null) =>
    ({
      type: 'profile/SET_STATUS',
      status: status,
    } as const),

  setPhoto: (photos: PhotosType) =>
    ({
      type: 'profile/SET_PHOTO',
      photos,
    } as const),

  setProfile: (profile: ProfileType) =>
    ({
      type: 'profile/SET_PROFILE',
      profile,
    } as const),
};

type ThunkType = BaseThunkType<ActionsTypes>;
type ThunkTypeWithForm = BaseThunkType<ActionsTypes | FormAction>;

export const getStatus =
  (userId: number): ThunkType =>
  async (dispatch) => {
    const data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(data));
  };

export const updateStatus =
  (status: string | null): ThunkType =>
  async (dispatch) => {
    const data = await profileAPI.updateStatus(status);
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.setStatus(status));
    }
  };

export const savePhoto =
  (photo: File): ThunkType =>
  async (dispatch) => {
    const data = await profileAPI.updatePhoto(photo);
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.setPhoto(data.data.photos));
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

export const setProfileData =
  (formData: ProfileType): ThunkTypeWithForm =>
  async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.setProfile(formData);
    if (data.resultCode === ResultCodesEnum.Success && userId) {
      const profile = await profileAPI.getProfile(userId);
      dispatch(actions.setProfile(profile));
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
