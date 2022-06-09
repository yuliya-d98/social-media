import React from 'react';
import s from '../dialogs.module.css';
import { NavLink } from 'react-router-dom';

const DialogItem = (props) => {
  return (
    <NavLink className={s.dialogItem} to={`/dialogs/${props.id}`}>
      {props.name}
    </NavLink>
  );
};

export default DialogItem;
