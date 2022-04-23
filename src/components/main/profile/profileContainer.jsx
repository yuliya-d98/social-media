import React from 'react';
import { connect } from 'react-redux';
import { useMatch } from 'react-router-dom';
import { compose } from 'redux';
import { profileAPI } from '../../../api/api';
import { withAuthRedirect } from '../../../hoc/with-auth-redirect';
import { setUserProfile, getStatus, updateStatus } from '../../../redux/profile-reducer';
import Profile from './profile';

class ProfileContainer extends React.Component {
    componentDidMount() {
        const userId = this.props.match ? this.props.match.params.userId : 2;
        profileAPI
            .getProfile(userId)
            .then(data => this.props.setUserProfile(data))
        profileAPI
            .getStatus(userId)
        // .then(status => this.props.updateStatus(status));
    }

    render() {
        return (
            <Profile
                {...this.props}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
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