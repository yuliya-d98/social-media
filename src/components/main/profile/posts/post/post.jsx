import React from "react";
import s from './post.module.css';

const Post = (props) => {
    return (
        <div className={s.post}>
            <img className={s.avatar} src="https://sib.fm/storage/article/April2021/Kb1KiTYol9I62IHiyBgV.jpeg" alt="user" />
            <div className={s.text}>
                <p className={s.username}>{props.username}</p>
                <p className={s.posttext}>{props.message}</p>
            </div>
        </div>
    )
}

export default Post;