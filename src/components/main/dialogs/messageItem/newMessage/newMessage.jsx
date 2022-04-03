import React from "react";
import { sendMessageActionCreator, updateNewMessageTextActionCreator } from "../../../../../redux/dialogs-reducer";

import s from '../../dialogs.module.css';

const NewMessage = (props) => {

    let newMessageText = props.newMessageText;
    
    const onNewMessageChange = (event) => {
        const text = event.target.value;
        const action = updateNewMessageTextActionCreator(text);
        props.dispatch(action);
    }

    
    const onSendMessageClick = () => {
        const action = sendMessageActionCreator();
        props.dispatch(action);
    }

    return (
        <div>
            <textarea className={s.newMessage} value={ newMessageText } onChange={ onNewMessageChange } placeholder='write your message...' minLength='1' maxLength='400' name="message-input" rows="5" required></textarea>
            <button className={s.sendMessage} onClick={ onSendMessageClick }>Send</button>
        </div>
    )
}

export default NewMessage;