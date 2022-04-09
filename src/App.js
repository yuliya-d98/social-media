// import logo from "./logo.svg";
import React from "react";
import "./App.css";
import Header from "./components/header";
import Sidebar from "./components/sidebar/sidebar";
import Profile from "./components/main/profile/profile";
import DialogsContainer from "./components/main/dialogs/dialogsContainer";
import News from "./components/main/news/news";
import Music from "./components/main/music/music";
import Settings from "./components/main/settings/settings";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UsersContainer from "./components/main/users/usersContainer";

function App(props) {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Sidebar />
        <div className="content-container">
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/dialogs/*" element={<DialogsContainer />} />
            <Route path="/news" element={<News />} />
            <Route path="/music" element={<Music />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/users" element={<UsersContainer />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
