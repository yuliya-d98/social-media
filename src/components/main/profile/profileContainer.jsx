import React from 'react';
import { connect } from 'react-redux';
import { Navigate, useMatch } from 'react-router-dom';
import { compose } from 'redux';
import { profileAPI } from '../../../api/api';
import { withAuthRedirect } from '../../../hoc/with-auth-redirect';
import { setUserProfile, getStatus, updateStatus } from '../../../redux/profile-reducer';
import Profile from './profile';

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId;
        if (this.props.match) {
            userId = this.props.match.params.userId;
        } else if (this.props.isAuth) {
            userId = this.props.authorizedUserId;
        } else {
            return <Navigate to='/login' />
        }

        profileAPI
            .getProfile(userId)
            .then(data => this.props.setUserProfile(data))
        profileAPI
            .getStatus(userId)
            .then(status => this.props.updateStatus(status));
    }

    render() {
        return (
            <Profile {...this.props} />
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
})

export const withRouter = (Component) => {
    const RouterComponent = (props) => {
        const match = useMatch('/profile/:userId/');
        return <Component {...props} match={match} />;
    }
    return RouterComponent;
}

export default compose(
    connect(mapStateToProps, { setUserProfile, getStatus, updateStatus }),
    withRouter,
    withAuthRedirect
)(ProfileContainer);