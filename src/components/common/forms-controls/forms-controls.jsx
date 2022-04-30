import s from './forms-controls.module.css';

const FormControl = (Element) => ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={hasError ? s.formControl + ' ' + s.error : s.formControl}>
            <Element {...props} {...input} />
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const Textarea = FormControl('textarea');

export const Input = FormControl('input');
