import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './sidebar.module.css';

const Friend = (props) => {
  return (
    <div className={s.friend}>
      <div className={s.friendImage}></div>
      <p className={s.friendName}>{props.name}</p>
    </div>
  )
}

const friendsData = [
  'Andrew',
  'Sasha',
  'Sveta',
  'Sveta',
  'Sveta',
  'Sveta',
]

const Sidebar = () => {
  const friends = friendsData.map(n => <Friend name={n} />)
  return (
    <nav className={s.sidebar}>
      <NavLink to="/profile" className={({ isActive }) => isActive ? `${s.link} ${s.active}` : `${s.link}`}>
        Profile
      </NavLink>
      <NavLink to="/dialogs" className={({ isActive }) => isActive ? `${s.link} ${s.active}` : `${s.link}`}>
        Messages
      </NavLink>
      <NavLink to="/news" className={({ isActive }) => isActive ? `${s.link} ${s.active}` : `${s.link}`}>
        News
      </NavLink>
      <NavLink to="/music" className={({ isActive }) => isActive ? `${s.link} ${s.active}` : `${s.link}`}>
        Music
      </NavLink>
      <NavLink to="/settings" className={({ isActive }) => isActive ? `${s.link} ${s.active}` : `${s.link}`}>
        Settings
      </NavLink>
      <NavLink to="/friends" className={({ isActive }) => isActive ? `${s.link} ${s.active}` : `${s.link}`}>
        Friends
      </NavLink>
      <div className={s.friends}>
        {friends}
      </div>
      <NavLink to="/users" className={({ isActive }) => isActive ? `${s.link} ${s.active}` : `${s.link}`}>
        All Users
      </NavLink>
    </nav>
  )
}

export default Sidebar;