import { Dispatch } from 'redux';
import { chatAPI, ChatMessageType } from '../api/chat-api';
import { BaseThunkType, InferActionsTypes } from './redux-store';

const initialState = {
  messages: [] as ChatMessageType[],
};

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'chat/MESSAGES_RECIEVED':
      return { ...state, messages: [...state.messages, ...action.newMessages] };
    default:
      return state;
  }
};

export default chatReducer;

export const actions = {
  messagesRecieved: (newMessages: ChatMessageType[]) =>
    ({
      type: 'chat/MESSAGES_RECIEVED',
      newMessages,
    } as const),
};

type ThunkType = BaseThunkType<ActionsTypes>;

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch): ((messages: ChatMessageType[]) => void) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => dispatch(actions.messagesRecieved(messages));
  }
  return _newMessageHandler;
};

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.start();
  chatAPI.subscribe(newMessageHandlerCreator(dispatch));
};

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  const unsubscribe = chatAPI.subscribe(newMessageHandlerCreator(dispatch));
  unsubscribe();
  // or
  // chatAPI.subscribe(newMessageHandler(dispatch));
  chatAPI.stop();
};

export const sendMessage =
  (message: string): ThunkType =>
  async (dispatch) => {
    debugger;
    chatAPI.sendMessage(message);
  };
