import React from "react";

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
    }

    activateEdiMode() {
        this.setState({
            editMode: true,
        })
    }

    deactivateEdiMode() {
        this.setState({
            editMode: false,
        })
    }

    render() {
        return (
            <div>
                {this.state.editMode
                    ? <input onBlur={this.deactivateEdiMode.bind(this)} value={this.props.status} autoFocus />
                    : <p onDoubleClick={this.activateEdiMode.bind(this)}>{this.props.status}</p>
                }
            </div>
        )
    }
}

export default ProfileStatus;