import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './sidebar.module.css';

const Sidebar = () => {
    return (
        <nav className={s.sidebar}>
        <NavLink to="/profile" className={({ isActive }) => isActive ? `${s.link} ${s.active}`: `${s.link}`}>
        {/* <NavLink to="/profile" className={s.link} activeClassName={s.active}> */}
          Profile
        </NavLink>
        <NavLink to="/dialogs" className={({ isActive }) => isActive ? `${s.link} ${s.active}`: `${s.link}`}>
        {/* <NavLink to="/dialogs" className={s.link} activeClassName={s.active}> */}
          Messages
        </NavLink>
        <NavLink to="/news" className={({ isActive }) => isActive ? `${s.link} ${s.active}`: `${s.link}`}>
        {/* <NavLink to="/news" className={s.link} activeClassName={s.active}> */}
          News
        </NavLink>
        <NavLink to="/music" className={({ isActive }) => isActive ? `${s.link} ${s.active}`: `${s.link}`}>
        {/* <NavLink to="/music" className={s.link} activeClassName={s.active}> */}
          Music
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => isActive ? `${s.link} ${s.active}`: `${s.link}`}>
        {/* <NavLink to="/settings" className={s.link} activeClassName={s.active}> */}
          Settings
        </NavLink>
      </nav>
    )
}

export default Sidebar;