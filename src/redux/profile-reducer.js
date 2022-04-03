const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

const profileReducer = (state, action) => {
  switch (action.type) {
    case ADD_POST:
      const newPost = {
        id: state.postsData.length,
        username: "Yuliya",
        message: state.newPostText,
      };
      state.postsData.push(newPost);
      state.newPostText = "";
      break;
    case UPDATE_NEW_POST_TEXT:
      state.newPostText = action.text;
      break;
    default:
      break;
  }

  return state;
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
