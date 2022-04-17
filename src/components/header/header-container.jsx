import React from 'react';
import { connect } from 'react-redux';
import { getAuthInfoThunkCreator, setAuthUserData } from '../../redux/auth-reducer';
import Header from './header';

class HeaderContainer extends React.Component {

    componentDidMount() {
        this.props.getAuthInfo();
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

export default connect(mapStateToProps, { setAuthUserData, getAuthInfo: getAuthInfoThunkCreator })(HeaderContainer);