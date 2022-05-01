import React from "react";
import Preloader from "../../../common/preloader";
import ProfileStatusWithHooks from "./profile-status-with-hooks";
import s from './user.module.css';

// const bestAvatarEver = 'https://sib.fm/storage/article/April2021/Kb1KiTYol9I62IHiyBgV.jpeg';


const User = (props) => {
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div className={s.user}>
            <img className={s.image} src={props.profile.photos.large ? props.profile.photos.large : ''} alt="user" />
            <div>
                <h2 className={s.header}>{props.profile.fullName}</h2>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
            </div>
        </div>
    )
}

export default User;