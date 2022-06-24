import { NavLink } from 'react-router-dom';
import s from './users.module.css';

type PropsType = {
  userId: number;
  name: string;
  status: string | null;
  photo: string;
  followed: boolean;
  followingInProgress: Array<number>;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
};

const User: React.FC<PropsType> = (props) => {
  return (
    <div className={s.user} id={props.userId.toString()}>
      <div className={s.userImgAndFollow}>
        <NavLink to={`/profile/${props.userId.toString()}`}>
          <img src={props.photo} className={s.image} alt="avatar" />
        </NavLink>
        {props.followed === true ? (
          <button
            disabled={props.followingInProgress.includes(props.userId)}
            className={s.followButton}
            onClick={() => props.unfollow(props.userId)}
          >
            Unfollow
          </button>
        ) : (
          <button
            disabled={props.followingInProgress.includes(props.userId)}
            className={s.followButton}
            onClick={() => props.follow(props.userId)}
          >
            Follow
          </button>
        )}
      </div>
      <div className={s.userInfo}>
        <p className={s.username}>{props.name}</p>
        <p className={s.city}>{`city, country`}</p>
        <p className={s.status}>{props.status}</p>
      </div>
    </div>
  );
};

export default User;
