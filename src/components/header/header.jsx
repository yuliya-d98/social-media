import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './header.module.css';

const Header = (props) => {
    return (
        <header className={s.header}>
            <h1>Social Network</h1>
            <div className={s.loginBlock}>
                {props.isAuth
                    ? props.login
                    : <NavLink to={'/login'} className={s.loginLink}>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header;