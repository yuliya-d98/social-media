import { UserType } from './types';

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodesWithCaptchaEnum {
  CaptchaIsRequired = 10,
}

export type CommonResponceType = {
  resultCode: ResultCodesEnum;
  messages: Array<string>;
  data: Record<string, never>;
};

// usersAPI

export type GetUsersType = {
  items: Array<UserType>;
  totalCount: number;
  error: string | null;
};

// profileAPI

// authAPI

export type MeType = {
  data: {
    id: number;
    login: string;
    email: string;
  };
  messages: Array<string>;
  fieldsErrors: Array<string>;
  resultCode: ResultCodesEnum;
};

export type LoginType = {
  resultCode: ResultCodesEnum | ResultCodesWithCaptchaEnum;
  messages: Array<string>;
  data: {
    userId: number;
  };
};

// securityAPI

export type GetCaptchaUrlType = {
  url: string;
};
