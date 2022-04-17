import { NavLink } from 'react-router-dom';
import { followAPI } from '../../../api/api';
import s from './users.module.css';

const User = (props) => {
    return (
        <div className={s.user} id={props.userId}>
            <div className={s.userImgAndFollow}>
                <NavLink to={`/profile/${props.userId}`}>
                    <img src={props.photo} className={s.image} alt='avatar' />
                </NavLink>
                {props.followed === true
                    ? <button disabled={props.followingInProgress.includes(props.userId)} className={s.followButton} onClick={() => {
                        props.toggleFollowingProgress(true, props.userId);
                        followAPI.unfollowUser(props.userId)
                            .then(data => {
                                if (data.resultCode === 0) {
                                    props.unfollow(props.userId);
                                }
                                props.toggleFollowingProgress(false, props.userId);
                            })
                            .catch(error => console.error(error));
                    }}>Unfollow</button>
                    : <button disabled={props.followingInProgress.includes(props.userId)} className={s.followButton} onClick={() => {
                        props.toggleFollowingProgress(true, props.userId);
                        followAPI.followUser(props.userId)
                            .then(data => {
                                if (data.resultCode === 0) {
                                    props.follow(props.userId);
                                }
                                props.toggleFollowingProgress(false, props.userId);
                            })
                            .catch(error => console.error(error));
                    }}>Follow</button>}
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