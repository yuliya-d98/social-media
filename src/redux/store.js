import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

const store = {
  _state: {
    profilePage: {
      postsData: [
        { id: 0, username: "Yuliya", message: "It's our new program! Hey!" },
        { id: 1, username: "Yuliya", message: "Hello its me" },
        { id: 2, username: "Yuliya", message: "Wow there are a lot of posts" },
      ],
      newPostText: "it-kamasutra.com",
    },
    messagesPage: {
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
    },
    sidebar: {},
  },

  _rerenderEntireTree() {
    console.log("state has changed");
  },

  getState() {
    return this._state;
  },

  subscribe(observer) {
    this._rerenderEntireTree = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.messagesPage = dialogsReducer(this._state.messagesPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);

    this._rerenderEntireTree();
  },
};

export default store;

window.store = store;
