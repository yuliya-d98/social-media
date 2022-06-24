import React, { ChangeEvent, useEffect, useState } from 'react';
import s from './profile-status.module.css';

type PropsType = {
  status: string | null;
  isOwner: boolean;
  updateStatus: (status: string | null) => Promise<void>;
};

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  useEffect(() => {
    if (props.isOwner) setStatus(props.status);
  }, [props.status, props.isOwner]);

  const activateMode = () => {
    if (props.isOwner) setEditMode(true);
  };

  const deactivateMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div className={s.container}>
      {editMode ? (
        <input
          className={s.input}
          onBlur={deactivateMode}
          onChange={onStatusChange}
          value={status || ''}
          autoFocus
          maxLength={300}
        />
      ) : (
        <p className={s.text} onDoubleClick={activateMode}>
          {props.status || 'No status'}
        </p>
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;
