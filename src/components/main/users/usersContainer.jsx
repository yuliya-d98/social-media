import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { followThunkCreator, getUsersThunkCreator, unfollowThunkCreator } from "../../../redux/users-reducer";
import Users from "./users";

class UsersContainer extends React.Component {
    constructor(props) {
        super(props);
        this.numOfPages = 5;
    }

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
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
                followingInProgress={this.props.followingInProgress}
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
        followingInProgress: state.usersPage.followingInProgress,
    }
}

export default compose(
    // withAuthRedirect,
    connect(mapStateToProps, {
        follow: followThunkCreator,
        unfollow: unfollowThunkCreator,
        getUsers: getUsersThunkCreator,
    }),
)(UsersContainer)