import React from "react";
import Preloader from "../../../common/preloader";
import ProfileStatusWithHooks from "./profile-status-with-hooks";
import s from './user.module.css';
import defaultAvatar from '../../../../assets/user-avatar.png';

// const bestAvatarEver = 'https://sib.fm/storage/article/April2021/Kb1KiTYol9I62IHiyBgV.jpeg';


const User = ({ profile, status, updateStatus }) => {
    if (!profile) {
        return <Preloader />
    }
    return (
        <div className={s.user}>
            <img className={s.image} src={profile.photos.large ? profile.photos.large : defaultAvatar} alt="user" />
            <div>
                <h2 className={s.header}>{profile.fullName}</h2>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
            </div>
        </div>
    )
}

export default User;