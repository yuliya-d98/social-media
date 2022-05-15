import React from "react";
import s from './post.module.css';
import defaultAvatar from '../../../../../assets/user-avatar.png';

const Post = (props) => {
    return (
        <div className={s.post}>
            <img className={s.avatar} src={props.photo || defaultAvatar} alt="user" />
            <div className={s.text}>
                <p className={s.username}>{props.username}</p>
                <p className={s.posttext}>{props.message}</p>
            </div>
        </div>
    )
}

export default Post;