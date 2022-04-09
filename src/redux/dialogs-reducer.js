const SEND_MESSAGE = "SEND-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

const initialState = {
  dialogData: [
    { id: 1, name: "Nikita" },
    { id: 2, name: "Valera" },
    { id: 3, name: "Sergey" },
  ],
  messageData: [
    { id: 1, text: "Hey!" },
    { id: 2, text: "Whats up?" },
    { id: 3, text: "How you doing man?" },
  ],
  newMessageText: "",
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE: {
      const newMessage = {
        id: state.messageData.length,
        text: state.newMessageText,
      };
      return {
        ...state,
        messageData: [...state.messageData, newMessage],
        newMessageText: "",
      };
    }
    case UPDATE_NEW_MESSAGE_TEXT: {
      return { ...state, newMessageText: action.text };
    }
    default:
      return state;
  }
};

export default dialogsReducer;

export const sendMessageActionCreator = () => ({
  type: SEND_MESSAGE,
});

export const updateNewMessageTextActionCreator = (text) => {
  return {
    type: UPDATE_NEW_MESSAGE_TEXT,
    text: text,
  };
};
