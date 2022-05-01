import React from "react";
import s from './posts.module.css';
import Post from "./post/post";
import { reduxForm } from "redux-form";
import { Field } from "redux-form";
import { maxLengthCreator, required } from "../../../../utils/validators/validators";
import { Textarea } from "../../../common/forms-controls/forms-controls";

const maxLength400 = maxLengthCreator(400);

const addPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} validate={[required, maxLength400]} className={s.textarea} name="post" rows="5" placeholder="your news..." required />
            <button className={s.button}>Send</button>
        </form>
    )
}

const AddPostReduxForm = reduxForm({ form: 'addPost' })(addPostForm)

const Posts = React.memo(props => {
    const postItems = props.postsData
        .map(post => <Post username={post.username} message={post.message} />)


    const onAddPost = (values) => {
        props.addPost(values.post);
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps !== this.props && nextState !== this.state
    // }

    return (
        <div className={s.posts}>
            <h3 className={s.header}>My posts</h3>
            <AddPostReduxForm onSubmit={onAddPost} />
            {postItems}
        </div>
    )
})

export default Posts;