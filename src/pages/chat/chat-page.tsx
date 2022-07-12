import { UserOutlined } from '@ant-design/icons';
import { Button, Input, Form, Avatar } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChatMessageType } from '../../api/chat-api';
import {
  sendMessage,
  startMessagesListening,
  stopMessagesListening,
} from '../../redux/chat-reducer';
import { selectMessages } from '../../redux/chat-selectors';
const { TextArea } = Input;

const ChatPage: React.FC = () => {
  return <Chat />;
};

export default ChatPage;

const Chat: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    };
  }, []);
  // const [wsChannel, setWsChannel] = useState<WebSocket | null>(null);
  // useEffect(() => {
  //   let ws: WebSocket;
  //   const closeHandler = () => {
  //     console.log('close wsChannel');
  //     setTimeout(createChannel, 3000);
  //   };
  //   const createChannel = () => {
  //     ws?.removeEventListener('close', closeHandler);
  //     ws?.close();
  //     ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
  //     ws.addEventListener('close', closeHandler);
  //     setWsChannel(ws);
  //   };
  //   createChannel();

  //   return () => {
  //     ws.removeEventListener('close', closeHandler);
  //     ws.close();
  //   };
  // }, []);

  return (
    <>
      <Messages />
      <AddMessageForm />
    </>
  );
};

const Messages: React.FC = () => {
  // const [messagesData, setMessagesData] = useState<ChatMessageType[]>([]);
  const messagesData = useSelector(selectMessages);
  // useEffect(() => {
  //   const messageHandler = (e: MessageEvent) => {
  //     const newMessageData = JSON.parse(e.data);
  //     setMessagesData((prevMessageData) => [...prevMessageData, ...newMessageData]);
  //   };
  //   wsChannel?.addEventListener('message', messageHandler);
  //   return () => {
  //     wsChannel?.removeEventListener('message', messageHandler);
  //   };
  // }, [wsChannel]);
  return (
    <div style={{ height: 'calc(100vh - 300px)', overflowY: 'auto' }}>
      {messagesData.map((m, i) => (
        <Message {...m} key={i} />
      ))}
    </div>
  );
};

const Message: React.FC<ChatMessageType> = (props) => {
  return (
    <div>
      <Avatar style={{ backgroundColor: '#87d068' }} src={props.photo} icon={<UserOutlined />} />
      <span>{props.userName}</span>
      <p>{props.message}</p>
      <hr />
    </div>
  );
};

const AddMessageForm: React.FC = () => {
  const [message, setMessage] = useState('');
  // const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending');
  const dispatch = useDispatch();
  const onSendMessage = () => {
    if (!message) {
      return;
    }
    dispatch(sendMessage(message));
    setMessage('');
  };

  // useEffect(() => {
  //   const openHandler = () => {
  //     setReadyStatus('ready');
  //   };
  //   wsChannel?.addEventListener('open', openHandler);
  //   return () => {
  //     wsChannel?.removeEventListener('open', openHandler);
  //   };
  // }, [wsChannel]);

  return (
    <Form>
      <TextArea rows={4} onChange={(e) => setMessage(e.currentTarget.value)} value={message} />
      <Button onClick={onSendMessage} disabled={false}>
        Send
      </Button>
    </Form>
  );
};
