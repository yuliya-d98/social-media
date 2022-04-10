import s from './users.module.css';

const User = (props) => {
    return (
        <div className={s.user} id={props.userId}>
            <div className={s.userImgAndFollow}>
                <img src={props.photo} className={s.image} alt='avatar' />
                {props.followed === true ?
                    <div className={s.followButton} onClick={() => props.unfollow(props.userId)}>Unfollow</div>
                    : <div className={s.followButton} onClick={() => props.follow(props.userId)}>Follow</div>}
            </div>
            <div className={s.userInfo}>
                <p className={s.username}>{props.name}</p>
                <p className={s.city}>{`city, country`}</p>
                <p className={s.status}>{props.status}</p>
            </div>
        </div>
    )
}

export default User;