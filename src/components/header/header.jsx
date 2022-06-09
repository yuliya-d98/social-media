import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './header.module.css';

const Header = (props) => {
  return (
    <header className={s.header}>
      <h1>Social Network</h1>
      <div className={s.loginBlock}>
        {props.isAuth ? (
          <div>
            <p className={s.login}>{props.login}</p>
            <button className={s.button} onClick={props.logout}>
              Log out
            </button>
          </div>
        ) : (
          <NavLink to={'/login'} className={s.button}>
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
