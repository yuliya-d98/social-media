import s from './users.module.css';
import User from "./user"

const Users = (props) => {
    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= props.numOfPages; i += 1) {
        pages.push(i);
    }

    return (
        <div>
            <h2>Users</h2>
            <div className={s.pagination}>
                {pages.map(p => <span className={props.currentPage === p ? `${s.page} ${s.active}` : s.page} onClick={() => props.onPageChanged(p)}>{p}</span>)}
                <span>...</span>
                <span className={props.currentPage === pagesCount ? `${s.page} ${s.active}` : s.page} onClick={() => props.onPageChanged(pagesCount)}>{pagesCount}</span>
            </div>
            {props.users.map(u => <User name={u.name} followed={u.followed} status={u.status} userId={u.id} photo={u.photos.small ? u.photos.small : 'https://adindex.ru/files/292751/%D0%B4%D0%B5%D0%B42.png'} follow={props.follow} unfollow={props.unfollow} />)}
            <div className={s.showMoreContainer}>
                <p className={s.showMoreBtn}>Show More</p>
            </div>
        </div>
    )
}

export default Users;