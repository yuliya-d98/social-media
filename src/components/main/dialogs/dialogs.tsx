import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { Field } from 'redux-form';
import { InitialStateType } from '../../../redux/dialogs-reducer';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/forms-controls/forms-controls';
import DialogItem from './dialogItem/dialogItem';
import s from './dialogs.module.css';
import MessageItem from './messageItem/messageItem';

const maxLength400 = maxLengthCreator(400);

type AddMessageFormData = {
  newMessage: string;
};

type AddMessageFormOwnPropsType = {
  messagesPage: InitialStateType;
};

type FormType = InjectedFormProps<AddMessageFormData, AddMessageFormOwnPropsType> &
  AddMessageFormOwnPropsType;

const AddMessageForm = (props: FormType) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        component={Textarea}
        validate={[required, maxLength400]}
        name="newMessage"
        className={s.newMessage}
        // value={props.messagesPage.newMessageText}
        placeholder="write your message..."
        rows="5"
      />
      <button className={s.sendMessage}>Send</button>
    </form>
  );
};

const AddMessageReduxForm = reduxForm<AddMessageFormData, AddMessageFormOwnPropsType>({
  form: 'dialogAddMessageForm',
})(AddMessageForm);

type PropsType = {
  messagesPage: InitialStateType;
  sendMessage: (message: string) => void;
};

const Dialogs = (props: PropsType) => {
  const dialogItems = props.messagesPage.dialogData.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} key={dialog.id} />
  ));
  const messageItems = props.messagesPage.messageData.map((message, index) => (
    <MessageItem text={message.text} key={index} />
  ));

  const addNewMessage = (values: { newMessage: string }) => {
    props.sendMessage(values.newMessage);
  };

  return (
    <div className={s.container}>
      <div className={s.dialogs}>{dialogItems}</div>
      <div className={s.messages}>
        {messageItems}
        <AddMessageReduxForm {...props} onSubmit={addNewMessage} />
      </div>
    </div>
  );
};

export default Dialogs;
