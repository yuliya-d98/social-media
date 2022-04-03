import React from 'react';
import s from './dialogs.module.css';
import DialogItem from './dialogItem/dialogItem';
import MessageItem from './messageItem/messageItem';
import NewMessage from './messageItem/newMessage/newMessage';

const Dialogs = (props) => {
    const dialogItems = props.messagesPage.dialogData.map(dialog => <DialogItem name={dialog.name} id={dialog.id} />)
    const messageItems = props.messagesPage.messageData.map(message => <MessageItem text={message.text} />)
    return (
        <div className={s.container}>
            <div className={s.dialogs}>
                { dialogItems }
            </div>
            <div className={s.messages}>
                { messageItems }
                <NewMessage newMessageText={props.messagesPage.newMessageText} dispatch={props.dispatch} />
            </div>
        </div>
    )
}

export default Dialogs;