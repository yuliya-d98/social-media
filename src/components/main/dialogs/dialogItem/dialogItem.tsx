import React from 'react';
import s from '../dialogs.module.css';
import { NavLink } from 'react-router-dom';

type DialogItemPropsType = {
  id: number;
  name: string;
};

const DialogItem = (props: DialogItemPropsType) => {
  return (
    <NavLink className={s.dialogItem} to={`/dialogs/${props.id}`}>
      {props.name}
    </NavLink>
  );
};

export default DialogItem;
