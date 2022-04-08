import React from "react";
import { addPostActionCreator, updateNewPostTextActionCreator } from "../../../../redux/profile-reducer";
import StoreContext from "../../../../store-context";
import Posts from "./posts";

const PostsContainer = (props) => {

    return (
        <StoreContext.Consumer>{
            (store) => {
                const state = store.getState();

                const addPost = () => {
                    const action = addPostActionCreator();
                    store.dispatch(action);
                }

                const onPostChange = (text) => {
                    const action = updateNewPostTextActionCreator(text);
                    store.dispatch(action);
                }
                return <Posts
                    onPostChange={onPostChange}
                    addPost={addPost}
                    postsData={state.profilePage.postsData}
                    newPostText={state.profilePage.newPostText} />
            }}
        </StoreContext.Consumer>
    )
}

export default PostsContainer;