import React from 'react';
import { connect } from 'react-redux';
import { authAPI } from '../../api/api';
import { setAuthUserData } from '../../redux/auth-reducer';
import Header from './header';

class HeaderContainer extends React.Component {

    componentDidMount() {
        authAPI.getAuthorisedUserInfo()
            .then(data => {
                if (data.resultCode === 0) {
                    const { id, email, login } = data.data;
                    this.props.setAuthUserData(id, email, login);
                }
            })
            .catch(error => console.error(error));
    }

    render() {
        return (
            <Header {...this.props} />
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})

export default connect(mapStateToProps, { setAuthUserData })(HeaderContainer);