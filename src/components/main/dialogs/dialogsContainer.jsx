import { connect } from 'react-redux';
import { withAuthRedirect } from '../../../hoc/with-auth-redirect';
import { sendMessageActionCreator, updateNewMessageTextActionCreator } from '../../../redux/dialogs-reducer';
import Dialogs from './dialogs';

const mapStateToProps = (state) => {
    return {
        messagesPage: state.messagesPage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: () => {
            const action = sendMessageActionCreator();
            dispatch(action);
        },
        newMessageChange: (text) => {
            const action = updateNewMessageTextActionCreator(text);
            dispatch(action);
        },
    }
}

const AuthRedirectComponent = withAuthRedirect(Dialogs);

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default DialogsContainer;