import React from 'react';
import { reduxForm } from 'redux-form';
import { Field } from 'redux-form';
import DialogItem from './dialogItem/dialogItem';
import s from './dialogs.module.css';
import MessageItem from './messageItem/messageItem';

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component='textarea' name='newMessage' className={s.newMessage} value={props.messagesPage.newMessageText} placeholder='write your message...' minLength='1' maxLength='400' rows="5" required />
            <button className={s.sendMessage}>Send</button>
        </form>
    )
}

const AddMessageReduxForm = reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm);


const Dialogs = (props) => {
    const dialogItems = props.messagesPage.dialogData.map(dialog => <DialogItem name={dialog.name} id={dialog.id} />)
    const messageItems = props.messagesPage.messageData.map(message => <MessageItem text={message.text} />)


    const addNewMessage = (values) => {
        props.sendMessage(values.newMessage)
    }

    return (
        <div className={s.container}>
            <div className={s.dialogs}>
                {dialogItems}
            </div>
            <div className={s.messages}>
                {messageItems}
                <AddMessageReduxForm {...props} onSubmit={addNewMessage} />
            </div>
        </div>
    )
}

export default Dialogs;