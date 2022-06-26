import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppStateType } from '../redux/redux-store';

const mapStateToPropsForRedirect = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
});

type MapPropsType = ReturnType<typeof mapStateToPropsForRedirect>;
type DispatchPropsType = Record<string, never>;

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
  const RedirectComponent = (props: MapPropsType & DispatchPropsType) => {
    const { isAuth, ...restProps } = props;
    if (!isAuth) return <Navigate to="/login" />;
    return <WrappedComponent {...(restProps as unknown as WCP)} />;
  };
  const ConnectedAuthRedirectComponent = connect<
    MapPropsType,
    DispatchPropsType,
    WCP,
    AppStateType
  >(
    mapStateToPropsForRedirect,
    {}
  )(RedirectComponent);

  return ConnectedAuthRedirectComponent;
}
