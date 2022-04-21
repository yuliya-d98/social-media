import React from 'react';
import s from './profile.module.css';
import User from './user/user';
import PostsContainer from './posts/postsContainer';

const Profile = (props) => {
    return (
        <main className={s.content}>
            <div className={s.parallax}></div>
            <User profile={props.profile} />
            <PostsContainer />
        </main>
    )
}

export default Profile;