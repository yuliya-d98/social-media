import { connect } from "react-redux";
import { addPostActionCreator as addPost } from "../../../../redux/profile-reducer";
import Posts from "./posts";

const mapStateToProps = (state) => ({
    postsData: state.profilePage.postsData,
    newPostText: state.profilePage.newPostText,
})

const PostsContainer = connect(mapStateToProps, { addPost })(Posts);

export default PostsContainer;