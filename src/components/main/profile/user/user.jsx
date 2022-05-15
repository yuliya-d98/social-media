import React from "react";
import Preloader from "../../../common/preloader";
import ProfileStatusWithHooks from "./profile-status-with-hooks";
import s from './user.module.css';
import defaultAvatar from '../../../../assets/user-avatar.png';

// const bestAvatarEver = 'https://sib.fm/storage/article/April2021/Kb1KiTYol9I62IHiyBgV.jpeg';


const UserLink = ({ href }) => {
    return (
        <i>{href ? <a href={href} target='_blank' rel="noreferrer">click</a> : 'no link'}</i>
    )
}

const User = ({ profile, status, updateStatus, isOwner, savePhoto }) => {
    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    const links = [];
    for (let link in profile.contacts) {
        links.push(<p>{link}: <UserLink href={profile.contacts[link]} /></p>)
    }

    return (
        <div className={s.user}>
            <div className={s.avatar}>
                <img className={s.image} src={profile.photos.large || defaultAvatar} alt="user" />
                {isOwner && <input className={s.input} type='file' onChange={onMainPhotoSelected} id='photo' />}
                {isOwner && <label className={s.label} htmlFor="photo">Choose photo</label>}
            </div>
            <div>
                <h2 className={s.header}>{profile.fullName}</h2>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} isOwner={isOwner} />
                <div className={s.aboutUser}>
                    <p>About me: <i>{profile.aboutMe || 'no info'}</i></p>
                    <p>Looking for a job: <i>{profile.lookingForAJob ? 'yes' : 'no'}</i></p>
                    {profile.lookingForAJob && <p>Looking for a job decription: <i>{profile.lookingForAJobDescription || 'no description'}</i></p>}
                </div>
                <div className={s.contacts}>
                    <p>Contacts:</p>
                    {links}
                </div>
            </div>
        </div>
    )
}


export default User;