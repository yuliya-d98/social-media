import { connect } from "react-redux";
import { addPostActionCreator, updateNewPostTextActionCreator } from "../../../../redux/profile-reducer";
import Posts from "./posts";

// const PostsContainer = (props) => {

//     return (
//         <StoreContext.Consumer>{
//             (store) => {
//                 const state = store.getState();

//                 const addPost = () => {
//                     const action = addPostActionCreator();
//                     store.dispatch(action);
//                 }

//                 const onPostChange = (text) => {
//                     const action = updateNewPostTextActionCreator(text);
//                     store.dispatch(action);
//                 }
//                 return <Posts
//                     onPostChange={onPostChange}
//                     addPost={addPost}
//                     postsData={state.profilePage.postsData}
//                     newPostText={state.profilePage.newPostText} />
//             }}
//         </StoreContext.Consumer>
//     )
// }

const mapStateToProps = (state) => {
    return {
        postsData: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPostChange: (text) => {
            const action = updateNewPostTextActionCreator(text);
            dispatch(action);
        },
        addPost: () => {
            const action = addPostActionCreator();
            dispatch(action);
        }
    }
}

const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts);

export default PostsContainer;