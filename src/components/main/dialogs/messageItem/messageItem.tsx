import React from 'react';
import s from '../dialogs.module.css';

type MessageItemPropsType = {
  text: string;
};

const MessageItem = (props: MessageItemPropsType) => {
  return (
    <div>
      <div className={s.messageItem}>{props.text}</div>
    </div>
  );
};

export default MessageItem;
