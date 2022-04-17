import React from 'react';
import { connect } from 'react-redux';
import { useMatch } from 'react-router-dom';
import { usersAPI } from '../../../api/api';
import { setUserProfile } from '../../../redux/profile-reducer';
import Profile from './profile';

class ProfileContainer extends React.Component {
    componentDidMount() {
        const userId = this.props.match ? this.props.match.params.userId : 2;
        usersAPI
            .getProfile(userId)
            .then(data => this.props.setUserProfile(data))
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} />
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
})

export const withRouter = (Component) => {
    const RouterComponent = (props) => {
        const match = useMatch('/profile/:userId/');
        return <Component {...props} match={match} />;
    }
    return RouterComponent;
}

const WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, { setUserProfile })(WithUrlDataContainerComponent);