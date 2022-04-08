import React from 'react';
import { sendMessageActionCreator, updateNewMessageTextActionCreator } from '../../../redux/dialogs-reducer';
import StoreContext from '../../../store-context';
import Dialogs from './dialogs';

const DialogsContainer = (props) => {
    return <StoreContext.Consumer>{
        (store) => {
            const state = store.getState();

            const onNewMessageChange = (text) => {
                const action = updateNewMessageTextActionCreator(text);
                store.dispatch(action);
            }

            const onSendMessageClick = () => {
                const action = sendMessageActionCreator();
                store.dispatch(action);
            }

            return (
                <Dialogs
                    sendMessage={onSendMessageClick}
                    newMessageChange={onNewMessageChange}
                    messagesPage={state.messagesPage} />
            )
        }
    }</StoreContext.Consumer>
};

export default DialogsContainer;