import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';
import Header from './header';

type HeaderPropsType = {
  isAuth: boolean;
  login: string | null;
  logout: () => Promise<void>;
};

class HeaderContainer extends React.Component<HeaderPropsType> {
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export default connect(mapStateToProps, { logout })(HeaderContainer);
