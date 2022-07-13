import { UserOutlined } from '@ant-design/icons';
import { Button, Input, Form, Avatar } from 'antd';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChatMessageAPIType } from '../../api/chat-api';
import {
  sendMessage,
  startMessagesListening,
  stopMessagesListening,
} from '../../redux/chat-reducer';
import { selectMessages, selectStatus } from '../../redux/chat-selectors';
const { TextArea } = Input;

const ChatPage: React.FC = () => {
  return <Chat />;
};

export default ChatPage;

const Chat: React.FC = () => {
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    };
  }, []);

  return (
    <>
      {status === 'error' && <p>Some error occured, please refresh page</p>}
      <Messages />
      <AddMessageForm />
    </>
  );
};

const Messages: React.FC = () => {
  const messagesData = useSelector(selectMessages);
  const [isAutoScroll, setIsAutoScroll] = useState(false);

  const messageAnchorRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (isAutoScroll) {
      //   window.scrollTo({
      //     top: container.scrollHeight,
      //     behavior: "smooth"
      // })
      // Если добавить новый экшн по зачистке стэйта и диспатчить его  в stopMessagesListening, то все работает хорошо и скролл в том числе.
      messageAnchorRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
      // messageAnchorRef.current?.scrollIntoView(true);
      // messageAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messagesData]);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget;
    if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 300) {
      !isAutoScroll && setIsAutoScroll(true);
    } else {
      isAutoScroll && setIsAutoScroll(false);
    }
  };

  return (
    <div style={{ height: 'calc(100vh - 300px)', overflowY: 'auto' }} onScroll={scrollHandler}>
      {messagesData.map((m) => (
        <Message {...m} key={m.id} />
      ))}
      <div ref={messageAnchorRef}></div>
    </div>
  );
};

const Message: React.FC<ChatMessageAPIType> = React.memo((props) => {
  return (
    <div>
      <Avatar style={{ backgroundColor: '#87d068' }} src={props.photo} icon={<UserOutlined />} />
      <span>{props.userName}</span>
      <p>{props.message}</p>
      <hr />
    </div>
  );
});

const AddMessageForm: React.FC = () => {
  const [message, setMessage] = useState('');
  const status = useSelector(selectStatus);

  const dispatch = useDispatch();

  const onSendMessage = () => {
    if (!message) {
      return;
    }
    dispatch(sendMessage(message));
    setMessage('');
  };

  return (
    <Form>
      <TextArea rows={4} onChange={(e) => setMessage(e.currentTarget.value)} value={message} />
      <Button onClick={onSendMessage} disabled={status !== 'ready'}>
        Send
      </Button>
    </Form>
  );
};
