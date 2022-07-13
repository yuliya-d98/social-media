let ws: WebSocket | null = null;

type EventNamesType = keyof typeof subscribers;
export type StatusType = 'pending' | 'ready' | 'error';
type MessagesRecievedSubscriberType = (messages: ChatMessageAPIType[]) => void;
type StatusChangedSubscriberType = (status: StatusType) => void;

const subscribers = {
  messagesRecieved: [] as MessagesRecievedSubscriberType[],
  statusChanged: [] as StatusChangedSubscriberType[],
};

const closeHandler = () => {
  console.log('close wsChannel');
  notifySubscribersAboutStatus('pending');
  setTimeout(createChannel, 3000);
};

const messageHandler = (e: MessageEvent) => {
  const newMessageData = JSON.parse(e.data);
  subscribers['messagesRecieved'].forEach((s) => s(newMessageData));
};

const openHandler = () => {
  notifySubscribersAboutStatus('ready');
};

const errorHandler = () => {
  notifySubscribersAboutStatus('error');
  console.error('refresh page');
};

const cleanUp = () => {
  ws?.removeEventListener('close', closeHandler);
  ws?.removeEventListener('message', messageHandler);
  ws?.removeEventListener('open', openHandler);
  ws?.removeEventListener('error', errorHandler);
};

const notifySubscribersAboutStatus = (status: StatusType) => {
  subscribers['statusChanged'].forEach((s) => s(status));
};

const createChannel = () => {
  cleanUp();
  ws?.close();
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
  notifySubscribersAboutStatus('pending');
  ws.addEventListener('close', closeHandler);
  ws.addEventListener('message', messageHandler);
  ws.addEventListener('open', openHandler);
  ws.addEventListener('error', errorHandler);
};

export const chatAPI = {
  start() {
    createChannel();
  },
  stop() {
    subscribers['messagesRecieved'] = [];
    subscribers['statusChanged'] = [];
    cleanUp();
    ws?.close();
  },
  subscribe(
    eventName: EventNamesType,
    callback: MessagesRecievedSubscriberType | StatusChangedSubscriberType
  ) {
    // @ts-ignore
    subscribers[eventName].push(callback);
    return () => {
      // @ts-ignore
      subscribers[eventName].filter((s) => s !== callback);
    };
  },
  unsubscribe(
    eventName: EventNamesType,
    callback: MessagesRecievedSubscriberType | StatusChangedSubscriberType
  ) {
    // @ts-ignore
    subscribers[eventName].filter((s) => s !== callback);
  },
  sendMessage(message: string) {
    ws?.send(message);
  },
};

export type ChatMessageAPIType = {
  message: string;
  photo: string | null;
  userId: number;
  userName: string;
};
