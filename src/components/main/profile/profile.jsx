import React from 'react';
import s from './profile.module.css';
import User from './user/user';
import PostsContainer from './posts/postsContainer';

const Profile = (props) => {
    return (
        <main className={s.content}>
            <User profile={props.profile} status={props.status} updateStatus={props.updateStatus} isOwner={props.isOwner} savePhoto={props.savePhoto} />
            <PostsContainer />
        </main>
    )
}

export default Profile;