import React from 'react';
import s from './profile.module.css';
import User from './user/user';
import Posts from './posts/posts';

const Profile = (props) => {
    return (
        <main className={s.content}>
            <div className={s.parallax}></div>
            <User />
            <Posts postsData={props.profilePage.postsData} newPostText={props.profilePage.newPostText} dispatch={props.dispatch} />
        </main>
    )
}

export default Profile;