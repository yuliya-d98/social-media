import { connect } from 'react-redux';
import { addPostActionCreator as addPost } from '../../../../redux/profile-reducer';
import { AppStateType } from '../../../../redux/redux-store';
import Posts from './posts';

const mapStateToProps = (state: AppStateType) => ({
  postsData: state.profilePage.postsData,
  // newPostText: state.profilePage.newPostText,
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;

type MapDispatchPropsType = {
  addPost: (newPostText: string) => void;
};

type OwnPropsType = {
  username: string | null;
  photo: string | null;
};

const PostsContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
  mapStateToProps,
  { addPost }
)(Posts);

export default PostsContainer;
