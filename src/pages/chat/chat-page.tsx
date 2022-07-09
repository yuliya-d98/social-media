import { UserOutlined } from '@ant-design/icons';
import { Button, Input, Form, Avatar } from 'antd';
import { useEffect, useState } from 'react';
const { TextArea } = Input;

const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

const Chat: React.FC = () => {
  return (
    <>
      <Messages />
      <AddMessageForm />
    </>
  );
};

export type ChatMessageType = {
  message: string;
  photo: string | null;
  userId: number;
  userName: string;
};

const Messages: React.FC = () => {
  const [messagesData, setMessagesData] = useState<ChatMessageType[]>([]);
  useEffect(() => {
    wsChannel.addEventListener('message', (e: MessageEvent) => {
      console.log(JSON.parse(e.data));
      const newMessageData = JSON.parse(e.data);
      setMessagesData((prevMessageData) => [...prevMessageData, ...newMessageData]);
    });
  }, []);
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
  const sendMessage = () => {
    if (!message) {
      return;
    }
    wsChannel.send(message);
    setMessage('');
  };

  return (
    <Form>
      <TextArea rows={4} onChange={(e) => setMessage(e.currentTarget.value)} value={message} />
      <Button onClick={sendMessage}>Send</Button>
    </Form>
  );
};

const ChatPage: React.FC = () => {
  return <Chat />;
};

export default ChatPage;
