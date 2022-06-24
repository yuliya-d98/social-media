import React from 'react';
import s from './profile.module.css';
import User from './user/user';
import PostsContainer from './posts/postsContainer';
import { ProfileType } from '../../../types/types';

type PropsType = {
  profile: ProfileType | null;
  status: string | null;
  isOwner: boolean;

  updateStatus: (status: string | null) => Promise<void>;
  savePhoto: (photo: File) => Promise<void>;
  setProfileData: (profile: ProfileType) => Promise<void>;
};

const Profile = (props: PropsType) => {
  return (
    <main className={s.content}>
      <User
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        isOwner={props.isOwner}
        savePhoto={props.savePhoto}
        setProfileData={props.setProfileData}
      />
      <PostsContainer
        username={props.profile ? props.profile.fullName : 'username'}
        photo={props.profile ? props.profile.photos.small : null}
      />
    </main>
  );
};

export default Profile;
