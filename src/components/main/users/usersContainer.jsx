import { connect } from "react-redux";
import { followAC, setUsersAC, unfollowAC } from "../../../redux/users-reducer";
import Users from "./users";

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.usersData,
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
        }
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;