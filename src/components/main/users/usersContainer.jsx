import React from "react";
import { connect } from "react-redux";
import { follow, setCurrentPage, setTotalUsersCount, setUsers, toggleIsFetching, unfollow } from "../../../redux/users-reducer";
import axios from "axios";
import Users from "./users";

class UsersContainer extends React.Component {
    constructor(props) {
        super(props);
        this.numOfPages = 5;
    }

    componentDidMount() {
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

export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
})(UsersContainer);