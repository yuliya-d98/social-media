import React from 'react';
import { connect } from 'react-redux';
import { Navigate, PathMatch, useMatch } from 'react-router-dom';
import { compose } from 'redux';
import { profileAPI } from '../../../api/profileAPI';
import {
  getStatus,
  actions,
  updateStatus,
  savePhoto,
  setProfileData,
} from '../../../redux/profile-reducer';
import { AppStateType } from '../../../redux/redux-store';
import { ProfileType } from '../../../types/types';
import Profile from './profile';

type MapStatePropsType = {
  profile: ProfileType | null;
  status: string | null;
  authorizedUserId: number | null;
  isAuth: boolean;
};

type MapDispatchPropsType = {
  setUserProfile: (profile: ProfileType) => Promise<void>;
  getStatus: (userId: number) => Promise<void>;
  updateStatus: (status: string | null) => Promise<void>;
  savePhoto: (photo: File) => Promise<void>;
  setProfileData: (profile: ProfileType) => Promise<void>;
};

type OwnProps = {
  match: PathMatch<'userId'> | null;
};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnProps;

class ProfileContainer extends React.Component<PropsType> {
  refreshProfile() {
    let userId: number;
    if (this.props.match && this.props.match.params.userId) {
      userId = +this.props.match.params.userId;
    } else if (this.props.isAuth && this.props.authorizedUserId) {
      userId = this.props.authorizedUserId;
    } else {
      return <Navigate to="/login" />;
    }

    profileAPI.getProfile(userId).then((data) => this.props.setUserProfile(data));
    profileAPI.getStatus(userId).then((status) => this.props.updateStatus(status));
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: PropsType) {
    const newUserId = this.props.match ? this.props.match.params.userId : null;
    const prevUserId = prevProps.match ? prevProps.match.params.userId : null;
    if (newUserId !== prevUserId) {
      this.refreshProfile();
    }
  }

  render() {
    return <Profile {...this.props} isOwner={!this.props.match} />;
  }
}

const mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
});

export const withRouter = (Component: typeof ProfileContainer) => {
  const RouterComponent = (props: PropsType) => {
    const match = useMatch('/profile/:userId/');
    return <Component {...props} match={match} />;
  };
  return RouterComponent;
};

const setUserProfile = actions.setUserProfile;

export default compose<React.ComponentType>(
  connect(mapStateToProps, { setUserProfile, getStatus, updateStatus, savePhoto, setProfileData }),
  withRouter
  // withAuthRedirect
)(ProfileContainer);
