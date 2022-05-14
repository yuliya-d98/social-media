import Preloader from '../../common/preloader';
import Paginator from '../../common/paginator/paginator';
import User from "./user";
import s from './users.module.css';
import defaultAvatar from '../../../assets/user-avatar.png';

const Users = (props) => {
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
            {props.users.map(u => <User
                name={u.name}
                followed={u.followed}
                status={u.status}
                userId={u.id}
                photo={u.photos.small ? u.photos.small : defaultAvatar}
                follow={props.follow}
                unfollow={props.unfollow}
                followingInProgress={props.followingInProgress}
            />)}
        </div>
    )
}

export default Users;