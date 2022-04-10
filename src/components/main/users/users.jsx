import axios from "axios";
import React from "react";
import User from "./user";
import s from './users.module.css';

class Users extends React.Component {
    constructor(props) {
        super(props);
        // this.usersList = this.props.users.map(u => {
        //     return <User name={u.name} followed={u.followed} status={u.status} userId={u.id} photo={u.photos.small ? u.photos.small : 'https://adindex.ru/files/292751/%D0%B4%D0%B5%D0%B42.png'} follow={this.props.follow} unfollow={this.props.unfollow} />
        // });
        this.numOfPages = 5;
    }

    componentDidMount() {
        if (this.props.users.length === 0) {
            const params = new URLSearchParams({
                page: this.props.currentPage,
                count: this.props.pageSize,
            });
            axios
                .get(`https://social-network.samuraijs.com/api/1.0/users?${params.toString()}`)
                .then(responce => {
                    this.props.setUsers(responce.data.items);
                    this.props.setTotalUsersCount(responce.data.totalCount);
                })
                .catch(e => console.error(e))
        }
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        const params = new URLSearchParams({
            page: pageNumber,
            count: this.props.pageSize,
        });
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/users?${params.toString()}`)
            .then(responce => this.props.setUsers(responce.data.items))
            .catch(e => console.error(e))
    }

    render() {

        const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        let pages = [];
        for (let i = 1; i <= this.numOfPages; i += 1) {
            pages.push(i);
        }

        return (
            <div>
                <h2>Users</h2>
                <div className={s.pagination}>
                    {pages.map(p => <span className={this.props.currentPage === p ? `${s.page} ${s.active}` : s.page} onClick={() => this.onPageChanged(p)}>{p}</span>)}
                    <span>...</span>
                    <span className={this.props.currentPage === pagesCount ? `${s.page} ${s.active}` : s.page} onClick={() => this.onPageChanged(pagesCount)}>{pagesCount}</span>
                </div>
                {/* {this.usersList} */}
                {this.props.users.map(u => <User name={u.name} followed={u.followed} status={u.status} userId={u.id} photo={u.photos.small ? u.photos.small : 'https://adindex.ru/files/292751/%D0%B4%D0%B5%D0%B42.png'} follow={this.props.follow} unfollow={this.props.unfollow} />)}
                <div className={s.showMoreContainer}>
                    <p className={s.showMoreBtn} onClick={this.moreUsers}>Show More</p>
                </div>
            </div>
        )
    }
}

export default Users;