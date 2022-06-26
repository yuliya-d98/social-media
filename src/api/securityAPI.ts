import { GetCaptchaUrlType } from '../types/api';
import { instance } from './api';

export const securityAPI = {
  getCaptchaURL() {
    return instance
      .get<GetCaptchaUrlType>('/security/get-captcha-url')
      .then((responce) => responce.data);
  },
};
