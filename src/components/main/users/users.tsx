import defaultAvatar from '../../../assets/user-avatar.png';
import { FilterType } from '../../../redux/users-reducer';
import { UserType } from '../../../types/types';
import Paginator from '../../common/paginator/paginator';
import Preloader from '../../common/preloader';
import User from './user';
import s from './users.module.css';
import UsersSearchForm from './usersSearchForm';

type PropsType = {
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: Array<number>;
  users: Array<UserType>;
  onPageChanged: (p: number) => void;
  onFilterChanged: (filter: FilterType) => void;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
};

const Users: React.FC<PropsType> = (props) => {
  return (
    <div className={s.container}>
      <h2>Users</h2>
      <UsersSearchForm onFilterChanged={props.onFilterChanged} />
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
