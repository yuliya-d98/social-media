import { combineReducers, createStore } from "redux";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";

let reducers = combineReducers({
  profilePage: profileReducer,
  messagesPage: dialogsReducer,
  usersPage: usersReducer,
  sidebar: sidebarReducer,
});
const store = createStore(reducers);

window.store = store;

export default store;
