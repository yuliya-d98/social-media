import { Field, Form, Formik } from 'formik';
import React from 'react';
import { FilterType } from '../../../redux/users-reducer';

const usersSearchFormValidate = () => {
  const errors = {};
  return errors;
};

type UsersSearchFormPropsType = {
  onFilterChanged: (filter: FilterType) => void;
};

type FormValuesType = {
  term: string;
  friend: 'true' | 'false' | 'null';
};

const convertFormValues = (values: FormValuesType) => ({
  term: values.term,
  friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false,
});

const UsersSearchForm = React.memo((props: UsersSearchFormPropsType) => {
  const onSubmit = (
    values: FormValuesType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const convertedValues = convertFormValues(values);
    props.onFilterChanged(convertedValues);
    setSubmitting(false);
  };
  return (
    <Formik
      initialValues={{ term: '', friend: 'null' }}
      validate={usersSearchFormValidate}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="term" />
          <Field name="friend" as="select">
            <option value="null">All</option>
            <option value="true">Only Followed</option>
            <option value="false">Only Unfollowed</option>
          </Field>
          <button type="submit" disabled={isSubmitting}>
            Find
          </button>
        </Form>
      )}
    </Formik>
  );
});

export default UsersSearchForm;
