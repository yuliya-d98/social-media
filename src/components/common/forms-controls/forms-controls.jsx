import s from './forms-controls.module.css';

const FormControl = (Element) => ({ input, meta: { touched, error }, ...props }) => {
    const hasError = touched && error;
    return (
        <div className={hasError ? s.formControl + ' ' + s.error : s.formControl}>
            <Element {...props} {...input} />
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea = FormControl('textarea');

export const Input = FormControl('input');
