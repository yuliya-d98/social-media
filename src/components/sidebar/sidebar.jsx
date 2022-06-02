import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './sidebar.module.css';
import clsx from 'clsx';

const Friend = (props) => {
  return (
    <div className={s.friend} key={props.name}>
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

const SideLink = ({ link, name }) => (
  <NavLink to={link} className={({ isActive }) => clsx(s.link, isActive && [s.active])} key={name}>
    {name}
  </NavLink>
)

const Sidebar = () => {
  const friends = friendsData.map(n => <Friend name={n} />)
  return (
    <nav className={s.sidebar}>
      <SideLink link="/profile" name='Profile' />
      <SideLink link="/dialogs" name='Messages' />
      <SideLink link="/news" name='News' />
      <SideLink link="/music" name='Music' />
      <SideLink link="/settings" name='Settings' />
      <SideLink link="/friends" name='Friends' />
      <div className={s.friends}>
        {friends}
      </div>
      <SideLink link="/users" name='All Users' />
    </nav>
  )
}

export default Sidebar;