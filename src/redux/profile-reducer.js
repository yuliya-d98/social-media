const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

const initialState = {
  postsData: [
    { id: 0, username: "Yuliya", message: "It's our new program! Hey!" },
    { id: 1, username: "Yuliya", message: "Hello its me" },
    { id: 2, username: "Yuliya", message: "Wow there are a lot of posts" },
  ],
  newPostText: "it-kamasutra.com",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      const newPost = {
        id: state.postsData.length,
        username: "Yuliya",
        message: state.newPostText,
      };
      return {
        ...state,
        postsData: [newPost, ...state.postsData],
        newPostText: "",
      };
    case UPDATE_NEW_POST_TEXT:
      return { ...state, newPostText: action.text };
    default:
      return state;
  }
};

export default profileReducer;

export const addPostActionCreator = () => ({
  type: ADD_POST,
});

export const updateNewPostTextActionCreator = (text) => {
  return {
    type: UPDATE_NEW_POST_TEXT,
    text: text,
  };
};
