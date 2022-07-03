import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import defaultAvatar from '../../../assets/user-avatar.png';
import {
  FilterType,
  followThunkCreator,
  getUsersThunkCreator,
  unfollowThunkCreator,
} from '../../../redux/users-reducer';
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsersData,
  getUsersFilter,
} from '../../../redux/users-selectors';
import Paginator from '../../common/paginator/paginator';
import Preloader from '../../common/preloader';
import User from './user';
import s from './users.module.css';
import UsersSearchForm from './usersSearchForm';

export const Users: React.FC = () => {
  const totalUsersCount = useSelector(getTotalUsersCount);
  const pageSize = useSelector(getPageSize);
  const currentPage = useSelector(getCurrentPage);
  const users = useSelector(getUsersData);
  const filter = useSelector(getUsersFilter);
  const isFetching = useSelector(getIsFetching);
  const followingInProgress = useSelector(getFollowingInProgress);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersThunkCreator(currentPage, pageSize, filter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // [] - componentDidMount

  const onPageChanged = (pageNumber: number) => {
    dispatch(getUsersThunkCreator(pageNumber, pageSize, filter));
  };
  const onFilterChanged = (filter: FilterType) => {
    dispatch(getUsersThunkCreator(1, pageSize, filter));
  };
  const follow = (userId: number) => {
    dispatch(followThunkCreator(userId));
  };
  const unfollow = (userId: number) => {
    dispatch(unfollowThunkCreator(userId));
  };

  return (
    <div className={s.container}>
      <h2>Users</h2>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
      <Paginator
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
      />
      {isFetching ? <Preloader /> : null}
      {users.map((u) => (
        <User
          key={u.id}
          name={u.name}
          followed={u.followed}
          status={u.status}
          userId={u.id}
          photo={u.photos.small ? u.photos.small : defaultAvatar}
          follow={follow}
          unfollow={unfollow}
          followingInProgress={followingInProgress}
        />
      ))}
    </div>
  );
};
