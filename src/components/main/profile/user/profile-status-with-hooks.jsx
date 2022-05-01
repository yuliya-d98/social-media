import React, { useEffect, useState } from "react";
import s from './profile-status.module.css';

const ProfileStatusWithHooks = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateMode = () => setEditMode(true);
    const deactivateMode = () => {
        setEditMode(false);
        props.updateStatus(status)
    };

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div className={s.container}>
            {editMode
                ? <input className={s.input} onBlur={deactivateMode} onChange={onStatusChange} value={status} autoFocus maxLength={300} />
                : <p className={s.text} onDoubleClick={activateMode}>{props.status || 'No status'}</p>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;