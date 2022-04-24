import { connect } from "react-redux";
import { addPostActionCreator } from "../../../../redux/profile-reducer";
import Posts from "./posts";

const mapStateToProps = (state) => {
    return {
        postsData: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (postText) => {
            const action = addPostActionCreator(postText);
            dispatch(action);
        }
    }
}

const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts);

export default PostsContainer;