import React from 'react';
import { sendMessageActionCreator, updateNewMessageTextActionCreator } from '../../../redux/dialogs-reducer';
import Dialogs from './dialogs';

const DialogsContainer = (props) => {
    debugger;

    const state = props.store.getState();

    const onNewMessageChange = (text) => {
        const action = updateNewMessageTextActionCreator(text);
        props.store.dispatch(action);
    }

    const onSendMessageClick = () => {
        const action = sendMessageActionCreator();
        props.store.dispatch(action);
    }

    return (
        <Dialogs 
        sendMessage={onSendMessageClick} 
        newMessageChange={onNewMessageChange}
        messagesPage={state.messagesPage}/>
    )
};

export default DialogsContainer;