import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../../hoc/with-auth-redirect';
import { sendMessageActionCreator } from '../../../redux/dialogs-reducer';
import Dialogs from './dialogs';

const mapStateToProps = (state) => {
    return {
        messagesPage: state.messagesPage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessage) => {
            const action = sendMessageActionCreator(newMessage);
            dispatch(action);
        },
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
)(Dialogs);