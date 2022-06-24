import clsx from 'clsx';
import { WrappedFieldProps } from 'redux-form';
// import { FieldValidatorType } from '../../../utils/validators/validators';
import s from './forms-controls.module.css';

// type ComponentType = ReturnType<typeof Input>;

// const FormControl: React.FC<React.ComponentType<OwnPropsType> | string> =
//   (Element): React.FC<WrappedFieldProps & OwnPropsType> =>
//   ({ input, meta: { touched, error }, ...props }) => {
//     const hasError = touched && error;
//     return (
//       <div className={clsx(s.formControl, hasError && s.error)}>
//         <Element className={s[Element.toString()]} {...props} {...input} value={input.value} />
//         {hasError && <span>{error}</span>}
//       </div>
//     );
//   };

const FormControl =
  (Element: 'input' | 'textarea') =>
  // (Element: string): React.FC<FormPropsType & OwnPropsType> =>
  ({ input, meta: { touched, error } }: WrappedFieldProps) => {
    const hasError = touched && error;
    // const value = input.value;
    return (
      <div className={clsx(s.formControl, hasError && s.error)}>
        <Element className={s[Element]} {...input} />
        {hasError && <span>{error}</span>}
      </div>
    );
  };
// const FormControl =
//   (Element: string | Component<FieldProps>) =>
//   // (Element: string): React.FC<FormPropsType & OwnPropsType> =>
//   ({ input, meta: { touched, error }, ...props }: WrappedFieldProps) => {
//     const hasError = touched && error;
//     // const value = input.value;
//     return (
//       <div className={clsx(s.formControl, hasError && s.error)}>
//         <Element className={s[Element]} {...props} {...input} />
//         {hasError && <span>{error}</span>}
//       </div>
//     );
//   };

// const FormControl =
//   (Element: string): React.FC<FormPropsType & OwnPropsType> =>
//   ({ input, meta: { touched, error }, ...props }) => {
//     const hasError = touched && error;
//     // const value = input.value;
//     return (
//       <div className={clsx(s.formControl, hasError && s.error)}>
//         <Element className={s[Element]} {...props} {...input} />
//         {hasError && <span>{error}</span>}
//       </div>
//     );
//   };

export const Textarea = FormControl('textarea');

export const Input = FormControl('input');
