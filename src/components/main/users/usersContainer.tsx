import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { AppStateType } from '../../../redux/redux-store';
import {
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
} from '../../../redux/users-selectors';
import { UserType } from '../../../types/types';
import Users from './users';

type MapStatePropsType = {
  currentPage: number;
  pageSize: number;
  totalUsersCount: number;
  users: Array<UserType>;
  isFetching: boolean;
  followingInProgress: Array<number>;
};

type MapDispatchPropsType = {
  getUsers: (currentPage: number, pageSize: number) => void;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
};

type OwnPropsType = Record<string, never>;

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    const { currentPage, pageSize } = this.props;
    this.props.getUsers(currentPage, pageSize);
  }

  onPageChanged = (pageNumber: number) => {
    this.props.getUsers(pageNumber, this.props.pageSize);
  };

  render() {
    return (
      <Users
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        onPageChanged={this.onPageChanged}
        users={this.props.users}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
        isFetching={this.props.isFetching}
        followingInProgress={this.props.followingInProgress}
      />
    );
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsersData(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default compose(
  // withAuthRedirect,
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    follow: followThunkCreator,
    unfollow: unfollowThunkCreator,
    getUsers: getUsersThunkCreator,
  })
)(UsersContainer);
