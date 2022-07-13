import { Dispatch } from 'redux';
import { chatAPI, ChatMessageAPIType, StatusType } from '../api/chat-api';
import { BaseThunkType, InferActionsTypes } from './redux-store';
import { v1 } from 'uuid';

type ChatMessageType = ChatMessageAPIType & {
  id: string;
};

const initialState = {
  messages: [] as ChatMessageType[],
  status: 'pending' as StatusType,
};

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'chat/MESSAGES_RECIEVED':
      return {
        ...state,
        messages: [
          ...state.messages,
          ...action.newMessages.map((m) => ({ ...m, id: v1() })),
        ].filter((_, i, array) => i >= array.length - 100),
      };
    case 'chat/STATUS_CHANGED':
      return { ...state, status: action.status };
    default:
      return state;
  }
};

export default chatReducer;

export const actions = {
  messagesRecieved: (newMessages: ChatMessageAPIType[]) =>
    ({
      type: 'chat/MESSAGES_RECIEVED',
      newMessages,
    } as const),
  statusChanged: (status: StatusType) =>
    ({
      type: 'chat/STATUS_CHANGED',
      status,
    } as const),
};

type ThunkType = BaseThunkType<ActionsTypes>;

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null;

const newMessageHandlerCreator = (
  dispatch: Dispatch
): ((messages: ChatMessageAPIType[]) => void) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => dispatch(actions.messagesRecieved(messages));
  }
  return _newMessageHandler;
};

let _statusChangedHandler: ((status: StatusType) => void) | null = null;

const statusChangedHandlerCreator = (dispatch: Dispatch): ((status: StatusType) => void) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => dispatch(actions.statusChanged(status));
  }
  return _statusChangedHandler;
};

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.start();
  chatAPI.subscribe('messagesRecieved', newMessageHandlerCreator(dispatch));
  chatAPI.subscribe('statusChanged', statusChangedHandlerCreator(dispatch));
};

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe('messagesRecieved', newMessageHandlerCreator(dispatch));
  chatAPI.unsubscribe('statusChanged', statusChangedHandlerCreator(dispatch));
  chatAPI.stop();
};

export const sendMessage =
  (message: string): ThunkType =>
  async (dispatch) => {
    chatAPI.sendMessage(message);
  };
