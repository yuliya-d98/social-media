import React from 'react';
import s from './dialogs.module.css';
import DialogItem from './dialogItem/dialogItem';
import MessageItem from './messageItem/messageItem';

const Dialogs = (props) => {
    const dialogItems = props.messagesPage.dialogData.map(dialog => <DialogItem name={dialog.name} id={dialog.id} />)
    const messageItems = props.messagesPage.messageData.map(message => <MessageItem text={message.text} />)
    
    const onNewMessageChange = (event) => {
        const text = event.target.value;
        props.newMessageChange(text);
    }

    return (
        <div className={s.container}>
            <div className={s.dialogs}>
                { dialogItems }
            </div>
            <div className={s.messages}>
                { messageItems }
                <div>
                    <textarea className={s.newMessage} value={ props.messagesPage.newMessageText } onChange={ onNewMessageChange } placeholder='write your message...' minLength='1' maxLength='400' name="message-input" rows="5" required></textarea>
                    <button className={s.sendMessage} onClick={ props.sendMessage }>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;