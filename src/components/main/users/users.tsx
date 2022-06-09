import Preloader from '../../common/preloader';
import Paginator from '../../common/paginator/paginator';
import User from './user';
import s from './users.module.css';
import defaultAvatar from '../../../assets/user-avatar.png';
import { UserType } from '../../../types/types';

type PropsType = {
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (p: number) => void;
  isFetching: boolean;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  followingInProgress: Array<number>;
  users: Array<UserType>;
};

const Users: React.FC<PropsType> = (props) => {
  return (
    <div className={s.container}>
      <h2>Users</h2>
      <Paginator
        totalItemsCount={props.totalUsersCount}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        onPageChanged={props.onPageChanged}
      />
      {props.isFetching ? <Preloader /> : null}
      {props.users.map((u) => (
        <User
          key={u.id}
          name={u.name}
          followed={u.followed}
          status={u.status}
          userId={u.id}
          photo={u.photos.small ? u.photos.small : defaultAvatar}
          follow={props.follow}
          unfollow={props.unfollow}
          followingInProgress={props.followingInProgress}
        />
      ))}
    </div>
  );
};

export default Users;
