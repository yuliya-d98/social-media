import clsx from 'clsx';
// import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { WrappedFieldProps } from 'redux-form';
import s from './forms-controls.module.css';

// GenericFieldHTMLAttributes
// type Attributes = {
//   input: InputHTMLAttributes<HTMLInputElement>;
//   select: SelectHTMLAttributes<HTMLSelectElement>;
//   textarea: TextareaHTMLAttributes<HTMLTextAreaElement>;
// };

const FormControl =
  (TagName: 'input' | 'textarea' | 'select') =>
  ({ input, meta: { touched, error }, ...rest }: WrappedFieldProps & unknown) => {
    // ({ input, meta: { touched, error }, ...rest }: WrappedFieldProps & Attributes[TagName]) => {
    const hasError = touched && error;
    return (
      <div className={clsx(s.formControl, hasError && s.error)}>
        <TagName className={s[TagName]} {...input} {...rest} />
        {hasError && <span>{error}</span>}
      </div>
    );
  };

export const Textarea = FormControl('textarea');

export const Input = FormControl('input');
