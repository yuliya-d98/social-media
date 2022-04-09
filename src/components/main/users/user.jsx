import s from './users.module.css';

const User = (props) => {
    return (
        <div className={s.user}>
            <div className={s.userImgAndFollow}>
                <div className={s.image}></div>
                {props.isFollowing === true ?
                    <div className={s.followButton} onClick={() => props.unfollow(props.userId)}>Unfollow</div>
                    : <div className={s.followButton} onClick={() => props.follow(props.userId)}>Follow</div>}
            </div>
            <div className={s.userInfo}>
                <p className={s.username}>{props.username}</p>
                <p className={s.city}>{`${props.city}, ${props.country}`}</p>
                <p className={s.status}>{props.status}</p>
            </div>
        </div>
    )
}

export default User;