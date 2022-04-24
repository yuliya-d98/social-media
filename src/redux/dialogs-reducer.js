const SEND_MESSAGE = "SEND-MESSAGE";

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
};

const dialogsReducer = (state = initialState, action) => {
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

export const sendMessageActionCreator = (newMessage) => ({
  type: SEND_MESSAGE,
  newMessage,
});
