import axios from 'axios';
import {
  CommonResponceType,
  GetCaptchaUrlType,
  GetUsersType,
  LoginType,
  MeType,
} from '../types/api';
import { ProfileType } from '../types/types';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0',
  withCredentials: true,
  headers: {
    'API-KEY': 'e04f9316-830a-404f-ab24-5fbb3da1e0cd',
  },
});

export const usersAPI = {
  getUsers(page: number, count: number) {
    const params = new URLSearchParams({
      page: page.toString(),
      count: count.toString(),
    });
    return instance
      .get<GetUsersType>(`/users?${params.toString()}`)
      .then((responce) => responce.data);
  },
};

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get<ProfileType>(`/profile/${userId}`).then((responce) => responce.data);
  },
  getStatus(userId: number) {
    return instance.get<string>(`/profile/status/${userId}`).then((responce) => responce.data);
  },
  updateStatus(status: string | null) {
    return instance
      .put<CommonResponceType>(`/profile/status`, { status })
      .then((responce) => responce.data);
  },
  updatePhoto(photo: File) {
    const formData = new FormData();
    formData.append('image', photo);
    return instance
      .put<CommonResponceType>(`/profile/photo`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((responce) => responce.data);
  },
  setProfile(formData: ProfileType) {
    // setProfile(userId: number, formData: ProfileType) {
    return instance.put<CommonResponceType>(`/profile`, formData).then((responce) => responce.data);
  },
};

export const followAPI = {
  followUser(userId: number) {
    return instance.post<CommonResponceType>(`/follow/${userId}`).then((responce) => responce.data);
  },
  unfollowUser(userId: number) {
    return instance
      .delete<CommonResponceType>(`/follow/${userId}`)
      .then((responce) => responce.data);
  },
};

export const authAPI = {
  me() {
    return instance.get<MeType>('/auth/me').then((responce) => responce.data);
  },
  login(email: string, password: string, captcha: string | null = null, rememberMe = false) {
    return instance
      .post<LoginType>('/auth/login', { email, password, captcha, rememberMe })
      .then((responce) => responce.data);
  },
  logout() {
    return instance.delete<CommonResponceType>('/auth/login').then((responce) => responce.data);
  },
};

export const securityAPI = {
  getCaptchaURL() {
    return instance
      .get<GetCaptchaUrlType>('/security/get-captcha-url')
      .then((responce) => responce.data);
  },
};
