import React from "react";
import s from './posts.module.css';
import Post from "./post/post";
import { reduxForm } from "redux-form";
import { Field } from "redux-form";

const addPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component='textarea' className={s.textarea} minLength='1' maxLength='400' name="post" rows="5" placeholder="your news..." required />
            <button className={s.button}>Send</button>
        </form>
    )
}

const AddPostReduxForm = reduxForm({ form: 'addPost' })(addPostForm)

const Posts = (props) => {

    const postItems = props.postsData
        .map(post => <Post username={post.username} message={post.message} />)

    const onAddPost = (values) => {
        props.addPost(values.post);
    }

    return (
        <div className={s.posts}>
            <h3 className={s.header}>My posts</h3>
            <AddPostReduxForm onSubmit={onAddPost} />
            {postItems}
        </div>
    )
}

export default Posts;