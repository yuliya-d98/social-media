const SEND_MESSAGE = "SEND-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

const dialogsReducer = (state, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      const newMessage = {
        id: state.messageData.length,
        text: state.newMessageText,
      };
      state.messageData.push(newMessage);
      state.newMessageText = "";
      break;
    case UPDATE_NEW_MESSAGE_TEXT:
      state.newMessageText = action.text;
      break;
    default:
      break;
  }

  return state;
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
