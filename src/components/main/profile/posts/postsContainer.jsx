import React from "react";
import { addPostActionCreator, updateNewPostTextActionCreator } from "../../../../redux/profile-reducer";
import Posts from "./posts";

const PostsContainer = (props) => {

    const state = props.store.getState();

    const addPost = () => {
        const action = addPostActionCreator();
        props.store.dispatch(action);
    }
    
    const onPostChange = (text) => {
        const action = updateNewPostTextActionCreator(text);
        props.store.dispatch(action);
    }

    return (<Posts 
        onPostChange={onPostChange} 
        addPost={addPost} 
        postsData={state.profilePage.postsData}
        newPostText={state.profilePage.newPostText} />)
}

export default PostsContainer;