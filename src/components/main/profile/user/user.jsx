import React from "react";
import Preloader from "../../../common/preloader";
import ProfileStatus from "./profile-status";
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
                <ProfileStatus status={`${props.profile.aboutMe ? props.profile.aboutMe : ''}`} />
                <p className={s.text}>{`About me: ${props.profile.aboutMe ? props.profile.aboutMe : 'no status'}`}</p>
                <p className={s.text}>{`Looking for a job: ${props.profile.lookingForAJob ? 'yes' : 'no'}`}</p>
            </div>
        </div>
    )
}

export default User;