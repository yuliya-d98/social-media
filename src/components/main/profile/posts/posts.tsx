import React from 'react';
import s from './posts.module.css';
import Post from './post/post';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { Field } from 'redux-form';
import { maxLengthCreator, required } from '../../../../utils/validators/validators';
import { Textarea } from '../../../common/forms-controls/forms-controls';
import formStyle from '../../../common/forms-controls/forms-controls.module.css';
import { PostType } from '../../../../types/types';

const maxLength400 = maxLengthCreator(400);
type FormDataType = {
  post: string;
};
type PostsFormOwnPropsType = Record<string, unknown>;
type FormType = InjectedFormProps<FormDataType, PostsFormOwnPropsType> & PostsFormOwnPropsType;

const addPostForm = (props: FormType) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        component={Textarea}
        validate={[required, maxLength400]}
        className={formStyle.textarea}
        name="post"
        rows="5"
        placeholder="your news..."
        required
      />
      <button className={s.button}>Send</button>
    </form>
  );
};

const AddPostReduxForm = reduxForm<FormDataType, PostsFormOwnPropsType>({ form: 'addPost' })(
  addPostForm
);

type PostsPropsType = {
  postsData: Array<PostType>;
  username: string | null;
  photo: string | null;

  addPost: (post: string) => void;
};

const Posts = React.memo((props: PostsPropsType) => {
  const postItems = props.postsData.map((post) => (
    <Post username={props.username} message={post.message} photo={props.photo} key={post.message} />
  ));

  const onAddPost = (values: FormDataType) => {
    props.addPost(values.post);
  };

  return (
    <div className={s.posts}>
      <h3 className={s.header}>My posts</h3>
      <AddPostReduxForm onSubmit={onAddPost} />
      {postItems}
    </div>
  );
});

export default Posts;