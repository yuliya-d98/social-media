import { connect } from "react-redux";
import { followAC, setCurrentPageAC, setTotalUsersCountAC, setUsersAC, unfollowAC } from "../../../redux/users-reducer";
import Users from "./users";

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.usersData,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
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
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;