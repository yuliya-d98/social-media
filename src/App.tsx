import React, { Suspense } from 'react';
import { connect, Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// for deploy
// import { HashRouter, Route, Routes } from "react-router-dom";
import 'antd/dist/antd.css';
import './App.css';
import { initializeApp } from './redux/app-reducer';
import store, { AppStateType } from './redux/redux-store';
import AppHeader from './components/header/header';

import Preloader from './components/common/preloader';
import { LoginPage } from './components/main/login/login';
import { sidebarItems } from './components/sidebar/sidebar';

import { Breadcrumb, Layout, Menu } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

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
        <Layout>
          <Header className="header">
            <AppHeader />
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
              <Sider className="site-layout-background" width={200}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['0']}
                  defaultOpenKeys={['sub0']}
                  style={{ height: '100%' }}
                  items={sidebarItems}
                />
              </Sider>
              <Content style={{ padding: '0 24px', minHeight: 280 }}>
                <Suspense fallback={<Preloader />}>
                  <Routes>
                    <Route path="/" element={<Navigate to="/profile" replace />} />
                    <Route path="/profile" element={<ProfileContainer />}>
                      <Route path=":userId" element={<ProfileContainer />} />
                    </Route>
                    <Route path="/dialogs/*" element={<DialogsContainer />} />
                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="*" element={<div>404 NOT FOUND</div>} />
                  </Routes>
                </Suspense>
              </Content>
            </Layout>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Samurai Social Network ©2022 Created by <a href="https://github.com/yuliya-d98/">me</a>
          </Footer>
        </Layout>
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
