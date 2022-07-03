import React, { Suspense } from 'react';
import { connect, Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// for deploy
// import { HashRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { initializeApp } from './redux/app-reducer';
import store, { AppStateType } from './redux/redux-store';

import Preloader from './components/common/preloader';
import HeaderContainer from './components/header/header-container';
import Music from './components/main/music/music';
import News from './components/main/news/news';
import Settings from './components/main/settings/settings';
import Sidebar from './components/sidebar/sidebar';
import { LoginPage } from './components/main/login/login';

const ProfileContainer = React.lazy(() => import('./components/main/profile/profileContainer'));
const DialogsContainer = React.lazy(() => import('./components/main/dialogs/dialogsContainer'));
const UsersPage = React.lazy(() => import('./components/main/users/usersContainer'));

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializeApp: () => void;
};

class App extends React.Component<MapPropsType & DispatchPropsType> {
  catchAllRejectedErrors = (e: PromiseRejectionEvent) => {
    console.log(e);
    alert(e.reason.message);
  };

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener('unhandledrejection', this.catchAllRejectedErrors);
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllRejectedErrors);
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        {/* <HashRouter basename="/"> */}
        <div className="container">
          <HeaderContainer />
          <Sidebar />
          <div className="content-container">
            <Suspense fallback={<Preloader />}>
              <Routes>
                <Route path="/" element={<Navigate to="/profile" replace />} />
                {/* <Route path="/" element={<Navigate to="/profile" replace />} /> */}
                <Route path="/profile" element={<ProfileContainer />}>
                  <Route path=":userId" element={<ProfileContainer />} />
                </Route>
                <Route path="/dialogs/*" element={<DialogsContainer />} />
                <Route path="/news" element={<News />} />
                <Route path="/music" element={<Music />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<div>404 NOT FOUND</div>} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </BrowserRouter>
      // </HashRouter>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
});

const AppWithRouter = connect(mapStateToProps, { initializeApp })(App);

const MainApp = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <AppWithRouter />
      </Provider>
    </React.StrictMode>
  );
};

export default MainApp;
