import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { FilterType } from '../../../redux/users-reducer';
import { getUsersFilter } from '../../../redux/users-selectors';

const usersSearchFormValidate = () => {
  const errors = {};
  return errors;
};

type UsersSearchFormPropsType = {
  onFilterChanged: (filter: FilterType) => void;
};

type FreindFilterType = 'true' | 'false' | 'null';

type FormValuesType = {
  term: string;
  friend: FreindFilterType;
};

const convertFormValues = (values: FormValuesType) => ({
  term: values.term,
  friend: values.friend === 'null' ? null : values.friend === 'true',
});

const UsersSearchForm = React.memo((props: UsersSearchFormPropsType) => {
  const filter = useSelector(getUsersFilter);
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
      enableReinitialize={true}
      initialValues={{
        term: filter.term,
        friend: String(filter.friend) as FreindFilterType,
      }}
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
