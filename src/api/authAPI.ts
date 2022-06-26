import { CommonResponceType, LoginType, MeType } from '../types/api';
import { instance } from './api';

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
