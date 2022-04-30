import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Preloader from "./components/common/preloader";
import HeaderContainer from "./components/header/header-container";
import DialogsContainer from "./components/main/dialogs/dialogsContainer";
import Login from "./components/main/login/login";
import Music from "./components/main/music/music";
import News from "./components/main/news/news";
import ProfileContainer from "./components/main/profile/profileContainer";
import Settings from "./components/main/settings/settings";
import UsersContainer from "./components/main/users/usersContainer";
import Sidebar from "./components/sidebar/sidebar";
import { initializeApp } from "./redux/app-reducer";

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    return (
      <BrowserRouter>
        <div className="container">
          <HeaderContainer />
          <Sidebar />
          <div className="content-container">
            <Routes>
              <Route path="/profile" element={<ProfileContainer />}>
                <Route path=":userId" element={<ProfileContainer />} />
              </Route>
              <Route path="/dialogs/*" element={<DialogsContainer />} />
              <Route path="/news" element={<News />} />
              <Route path="/music" element={<Music />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/users" element={<UsersContainer />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

export default connect(mapStateToProps, { initializeApp })(App);
