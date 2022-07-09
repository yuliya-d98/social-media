import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
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

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }
// const userId = query.get("userId")

// useNavigate & useSearchParams

export const Users: React.FC = () => {
  const totalUsersCount = useSelector(getTotalUsersCount);
  const pageSize = useSelector(getPageSize);
  const currentPage = useSelector(getCurrentPage);
  const users = useSelector(getUsersData);
  const filter = useSelector(getUsersFilter);
  const isFetching = useSelector(getIsFetching);
  const followingInProgress = useSelector(getFollowingInProgress);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams({
      page: currentPage.toString(),
      count: pageSize.toString(),
      // ...(currentPage != 1 && { page: currentPage.toString() }),
      // ...(pageSize != 10 && { count: pageSize.toString() }),
      ...(filter.term && { term: filter.term }),
      ...(typeof filter.friend === 'boolean' && { friend: filter.friend.toString() }),
    });
    navigate(`/users?${params.toString()}`);
  }, [filter, currentPage, pageSize]);

  useEffect(() => {
    debugger;
    const search = location.search;
    const params = new URLSearchParams(search);

    let actualCurrentPage = currentPage;
    const paramsCurrentPage = params.get('page');
    if (paramsCurrentPage) {
      actualCurrentPage = +paramsCurrentPage;
    }

    let actualPageSize = pageSize;
    const paramsPageSize = params.get('count');
    if (paramsPageSize) {
      actualPageSize = +paramsPageSize;
    }

    let actualFilterTerm = filter.term;
    const paramsTerm = params.get('term');
    if (paramsTerm) {
      actualFilterTerm = paramsTerm;
    }

    let actualFilterFriend = filter.friend;
    const paramsFriend = params.get('friend');
    switch (paramsFriend) {
      case 'true':
        actualFilterFriend = true;
        break;
      case 'false':
        actualFilterFriend = false;
        break;
    }

    const actualFilter: FilterType = {
      term: actualFilterTerm,
      friend: actualFilterFriend,
    };
    dispatch(getUsersThunkCreator(actualCurrentPage, actualPageSize, actualFilter));
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
