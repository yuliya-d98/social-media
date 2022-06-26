import { CommonResponceType } from '../types/api';
import { instance } from './api';

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
