import React from "react";
import s from './profile-status.module.css';

class ProfileStatus extends React.Component {
    statusInputRef = React.createRef()

    state = {
        editMode: false,
        status: this.props.status,
    }

    activateEditMode = () => {
        this.setState({
            editMode: true,
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false,
        })
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value,
        })
    }

    render() {
        return (
            <div className={s.container}>
                {this.state.editMode
                    ? <input className={s.input} onBlur={this.deactivateEditMode} onChange={this.onStatusChange} value={this.state.status} autoFocus maxLength={300} />
                    : <p className={s.text} onDoubleClick={this.activateEditMode}>{this.props.status || 'No status'}</p>
                }
            </div>
        )
    }
}

export default ProfileStatus;