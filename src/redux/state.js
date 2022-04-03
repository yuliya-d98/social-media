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

    // if (action.type === ADD_POST) {
    //   const newPost = {
    //     id: this._state.profilePage.postsData.length,
    //     username: "Yuliya",
    //     message: this._state.profilePage.newPostText,
    //   };
    //   this._state.profilePage.postsData.push(newPost);
    //   this._state.profilePage.newPostText = "";
    //   this._rerenderEntireTree();
    // } else if (action.type === UPDATE_NEW_POST_TEXT) {
    //   this._state.profilePage.newPostText = action.text;
    //   this._rerenderEntireTree();
    // } else if (action.type === SEND_MESSAGE) {
    //   const newMessage = {
    //     id: this._state.messagesPage.messageData.length,
    //     text: this._state.messagesPage.newMessageText,
    //   };
    //   this._state.messagesPage.messageData.push(newMessage);
    //   this._state.messagesPage.newMessageText = "";
    //   this._rerenderEntireTree();
    // } else if (action.type === UPDATE_NEW_MESSAGE_TEXT) {
    //   this._state.messagesPage.newMessageText = action.text;
    //   this._rerenderEntireTree();
    // }
  },

  // addPost() {
  //   const newPost = {
  //     id: this._state.profilePage.postsData.length,
  //     username: "Yuliya",
  //     message: this._state.profilePage.newPostText,
  //   };

  //   this._state.profilePage.postsData.push(newPost);
  //   this._state.profilePage.newPostText = "";
  //   this._rerenderEntireTree();
  // },

  // updateNewPostText(text) {
  //   this._state.profilePage.newPostText = text;
  //   this._rerenderEntireTree();
  // },
};

export default store;

window.store = store;
