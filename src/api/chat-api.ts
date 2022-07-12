let ws: WebSocket | null = null;
const closeHandler = () => {
  console.log('close wsChannel');
  setTimeout(createChannel, 3000);
};

const messageHandler = (e: MessageEvent) => {
  const newMessageData = JSON.parse(e.data);
  subscribers.forEach((s) => s(newMessageData));
};

const createChannel = () => {
  ws?.removeEventListener('close', closeHandler);
  ws?.removeEventListener('message', messageHandler);
  ws?.close();
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
  ws.addEventListener('close', closeHandler);
  ws.addEventListener('message', messageHandler);
  debugger;
};

let subscribers = [] as SubscriberType[];

export const chatAPI = {
  start() {
    createChannel();
  },
  stop() {
    subscribers = [];
    ws?.removeEventListener('close', closeHandler);
    ws?.removeEventListener('message', messageHandler);
    ws?.close();
  },
  subscribe(callback: SubscriberType) {
    subscribers.push(callback);
    return () => {
      subscribers.filter((s) => s !== callback);
    };
  },
  unsubscribe(callback: SubscriberType) {
    subscribers.filter((s) => s !== callback);
  },
  sendMessage(message: string) {
    if (ws) {
      debugger;
      ws.send(message);
    }
  },
};

type SubscriberType = (messages: ChatMessageType[]) => void;

export type ChatMessageType = {
  message: string;
  photo: string | null;
  userId: number;
  userName: string;
};
