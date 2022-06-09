import React, { ChangeEvent } from 'react';
import s from './profile-status.module.css';

type PropsType = {
  status: string;

  updateStatus: (status: string) => void;
};

type LocalStateType = {
  editMode: boolean;
  status: string;
};

class ProfileStatus extends React.Component<PropsType, LocalStateType> {
  state = {
    editMode: false,
    status: this.props.status,
  };

  activateEditMode = () => {
    this.setState({
      editMode: true,
    });
  };

  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateStatus(this.state.status);
  };

  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.currentTarget.value,
    });
  };

  componentDidUpdate = (prevProps: PropsType) => {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status,
      });
    }
  };

  render() {
    return (
      <div className={s.container}>
        {this.state.editMode ? (
          <input
            className={s.input}
            onBlur={this.deactivateEditMode}
            onChange={this.onStatusChange}
            value={this.state.status}
            autoFocus
            maxLength={300}
          />
        ) : (
          <p className={s.text} onDoubleClick={this.activateEditMode}>
            {this.props.status || 'No status'}
          </p>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
