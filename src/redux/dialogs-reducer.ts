import { DialogType, MessageType } from '../types/types';
import { InferActionsTypes } from './redux-store';

const SEND_MESSAGE = 'dialogs/SEND-MESSAGE';

const initialState = {
  dialogData: [
    { id: 1, name: 'Nikita' },
    { id: 2, name: 'Valera' },
    { id: 3, name: 'Sergey' },
  ] as Array<DialogType>,
  messageData: [
    { id: 1, text: 'Hey!' },
    { id: 2, text: 'Whats up?' },
    { id: 3, text: 'How you doing man?' },
  ] as Array<MessageType>,
};

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case SEND_MESSAGE: {
      const newMessage = {
        id: state.messageData.length,
        text: action.newMessage,
      };
      return {
        ...state,
        messageData: [...state.messageData, newMessage],
      };
    }
    default:
      return state;
  }
};

export default dialogsReducer;

export const actions = {
  sendMessage: (newMessage: string) =>
    ({
      type: SEND_MESSAGE,
      newMessage,
    } as const),
};
