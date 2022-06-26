import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../../hoc/with-auth-redirect';
import { actions } from '../../../redux/dialogs-reducer';
import { AppStateType } from '../../../redux/redux-store';
import Dialogs from './dialogs';

const mapStateToProps = (state: AppStateType) => {
  return {
    messagesPage: state.messagesPage,
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, { sendMessage: actions.sendMessage }),
  withAuthRedirect
)(Dialogs);
