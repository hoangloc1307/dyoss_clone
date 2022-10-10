import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import style from './InputField.module.scss';

const cx = classNames.bind(style);

function InputField({ type, id, name, placeholder, value, label, require, touched, error, onChange, onBlur }) {
    const { t } = useTranslation();
    const Tag = type === 'textarea' ? 'textarea' : 'input';

    return (
        <>
            <div className={cx('input-field')}>
                <Tag
                    type={type}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                />
                <label htmlFor={id}>
                    {label}
                    {require && <span>*</span>}
                </label>
            </div>
            {touched && error && <span className={cx('form-error')}>{t(error)}</span>}
        </>
    );
}

export default InputField;
