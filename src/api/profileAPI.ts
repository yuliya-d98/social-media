import { CommonResponceType } from '../types/api';
import { ProfileType } from '../types/types';
import { instance } from './api';

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
    return instance.put<CommonResponceType>(`/profile`, formData).then((responce) => responce.data);
  },
};
