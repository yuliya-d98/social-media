import React from "react";
import { connect } from "react-redux";
import { followAC, setCurrentPageAC, setTotalUsersCountAC, setUsersAC, toggleIsFetchingAC, unfollowAC } from "../../../redux/users-reducer";
import axios from "axios";
import Users from "./users";

class UsersContainer extends React.Component {
    constructor(props) {
        super(props);
        // this.usersList = this.props.users.map(u => {
        //     return <User name={u.name} followed={u.followed} status={u.status} userId={u.id} photo={u.photos.small ? u.photos.small : 'https://adindex.ru/files/292751/%D0%B4%D0%B5%D0%B42.png'} follow={this.props.follow} unfollow={this.props.unfollow} />
        // });
        this.numOfPages = 5;
    }

    componentDidMount() {
        // if (this.props.users.length === 0) {

        this.props.toggleIsFetching(true);
        const params = new URLSearchParams({
            page: this.props.currentPage,
            count: this.props.pageSize,
        });
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/users?${params.toString()}`)
            .then(responce => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(responce.data.items);
                this.props.setTotalUsersCount(responce.data.totalCount);
            })
            .catch(e => console.error(e))
        // }
    }

    onPageChanged = (pageNumber) => {
        this.props.toggleIsFetching(true);
        this.props.setCurrentPage(pageNumber);
        const params = new URLSearchParams({
            page: pageNumber,
            count: this.props.pageSize,
        });
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/users?${params.toString()}`)
            .then(responce => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(responce.data.items)
            })
            .catch(e => console.error(e))
    }

    render() {
        return <>
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                numOfPages={this.numOfPages}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                isFetching={this.props.isFetching}
            />
        </>
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.usersData,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            const action = followAC(userId);
            dispatch(action);
        },
        unfollow: (userId) => {
            const action = unfollowAC(userId);
            dispatch(action);
        },
        setUsers: (users) => {
            const action = setUsersAC(users);
            dispatch(action);
        },
        setCurrentPage: (currentPage) => {
            const action = setCurrentPageAC(currentPage);
            dispatch(action);
        },
        setTotalUsersCount: (totalUsersCount) => {
            const action = setTotalUsersCountAC(totalUsersCount);
            dispatch(action);
        },
        toggleIsFetching: (isFetching) => {
            const action = toggleIsFetchingAC(isFetching);
            dispatch(action);
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);