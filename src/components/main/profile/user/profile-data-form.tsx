import { ChangeEvent, useState } from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { ProfileType } from '../../../../types/types';
import { required } from '../../../../utils/validators/validators';
import { Input, Textarea } from '../../../common/forms-controls/forms-controls';
import formStyle from './../../../common/forms-controls/forms-controls.module.css';
import s from './profile-data-form.module.css';

type ContactPropsType = {
  contact: string;
};

const Contact = ({ contact }: ContactPropsType) => {
  return (
    <div className={s.link}>
      <label htmlFor={contact} className={s.label}>{`${contact}: `}</label>
      <Field component={Input} type="text" id={contact} name={'contacts.' + contact} />
    </div>
  );
};

type ProfileFormOwnPropsType = {
  profile: ProfileType;
  initialValues: ProfileType;
  fromEditMode: () => void;
};

type FormType = InjectedFormProps<ProfileType, ProfileFormOwnPropsType> & ProfileFormOwnPropsType;

const ProfileDataForm = ({ handleSubmit, error, profile }: FormType) => {
  const [checked, setChecked] = useState(false);

  const onCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checkbox = e.target;
    setChecked(checkbox.checked);
  };

  if (error) console.log(error);

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label htmlFor="fullName" className={s.label}>
        Fullname:{' '}
      </label>
      <Field component={Input} validate={[required]} type="text" id="fullName" name="fullName" />
      <label htmlFor="aboutMe" className={s.label}>
        About me:{' '}
      </label>
      <Field component={Textarea} validate={[required]} type="text" id="aboutMe" name="aboutMe" />
      <Field
        component={Input}
        type="checkbox"
        id="lookingForAJob"
        name="lookingForAJob"
        onChange={onCheckboxChange}
        className={formStyle.checkbox}
      />
      <label htmlFor="lookingForAJob" className={formStyle.checkboxLabel}>
        Looking for a job
      </label>
      {checked && (
        <label htmlFor="lookingForAJobDescription" className={s.label}>
          Your skills:{' '}
        </label>
      )}
      {checked && (
        <Field
          component={Textarea}
          validate={[required]}
          id="lookingForAJobDescription"
          name="lookingForAJobDescription"
        />
      )}
      <p className={s.paragraph}>Contacts:</p>
      {Object.keys(profile.contacts).map((link) => (
        <Contact contact={link} key={link} />
      ))}
      {error && <p className={formStyle.formSummaryError}>{error}</p>}
      <button className={formStyle.button}>Save</button>
    </form>
  );
};

export default reduxForm<ProfileType, ProfileFormOwnPropsType>({
  form: 'profile',
})(ProfileDataForm);
