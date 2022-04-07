import React from "react";
import s from './posts.module.css';
import Post from "./post/post";

const Posts = (props) => {
    
    const postItems = props.postsData
        .map(post => <Post username={post.username} message={post.message} />)

    const newPostElement = React.createRef();
    
    const onPostChange = () => {
        const text = newPostElement.current.value;
        props.onPostChange(text)
    }

    return (
        <div className={s.posts}>
            <h3 className={s.header}>My posts</h3>
            <form>
                <textarea className={s.textarea} onChange={onPostChange} value={props.newPostText} ref={newPostElement} minLength='1' maxLength='400' name="post-input" rows="5" placeholder="your news..." required />
                <button className={s.button} onClick={props.addPost} type="button">Send</button>
            </form>
            { postItems }
        </div>
    )
}

export default Posts;