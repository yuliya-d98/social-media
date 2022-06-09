//  profile reducer

export type PostType = {
  id: number;
  message: string;
};

export type ContantsType = {
  facebook: string | null;
  website: string | null;
  vk: string | null;
  twitter: string | null;
  instagram: string | null;
  youtube: string | null;
  github: string | null;
  mainLink: string | null;
};

export type PhotosType = {
  small: string | null;
  large: string | null;
};

export type ProfileType = {
  aboutMe: string;
  contacts: ContantsType;
  lookingForAJob: boolean;
  lookingForAJobDescription: string | null;
  fullName: string | null;
  userId: number;
  photos: PhotosType;
};

// dialogs reducer

export type DialogType = {
  id: number;
  name: string;
};

export type MessageType = {
  id: number;
  text: string;
};

// users reducer

export type UserType = {
  name: string;
  id: number;
  uniqueUrlName: string | null;
  photos: PhotosType;
  status: string | null;
  followed: boolean;
};
