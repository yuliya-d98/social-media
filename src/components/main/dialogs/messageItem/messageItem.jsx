import React from 'react';
import s from '../dialogs.module.css';

const MessageItem = (props) => {
    return (
        <div>
            <div className={s.messageItem}>{props.text}</div>
        </div>
    )
}

export default MessageItem;