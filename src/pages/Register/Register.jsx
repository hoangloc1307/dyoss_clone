import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import Button from '~/components/Button';
import InputField from '~/components/InputField';
import style from './Register.module.scss';

const cx = classNames.bind(style);

function Register() {
    const { t } = useTranslation();

    const formik = useFormik({
        initialValues: {
            email: '',
            phone: '',
            name: '',
            password: '',
            confirmPassword: '',
            accept: false,
        },
        validationSchema: Yup.object({
            email: Yup.string().email('register.invalidEmail').required('register.requiredEmail'),
            phone: Yup.string().required('register.requiredPhone'),
            name: Yup.string().required('register.requiredName'),
            password: Yup.string().required('register.requiredPassword').min(8, 'register.minPassword'),
            confirmPassword: Yup.string()
                .required('register.requiredConfirmPassword')
                .oneOf([Yup.ref('password')], 'register.confirmPasswordError'),
            accept: Yup.boolean().oneOf([true], 'register.requiredAccept'),
        }),
        onSubmit: values => {
            console.log(values);
        },
    });

    return (
        <main className={cx('register-page')}>
            <div className={cx('container')}>
                <h2 className={cx('title')}>{t('register.register')}</h2>
                <form spellCheck="false" onSubmit={formik.handleSubmit}>
                    <InputField
                        type="text"
                        id="email"
                        name="email"
                        placeholder="."
                        value={formik.values.email}
                        label="Email"
                        require
                        touched={formik.touched.email}
                        error={formik.errors.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <InputField
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="."
                        value={formik.values.phone}
                        label={t('register.phone')}
                        require
                        touched={formik.touched.phone}
                        error={formik.errors.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <InputField
                        type="text"
                        id="name"
                        name="name"
                        placeholder="."
                        value={formik.values.name}
                        label={t('register.name')}
                        require
                        touched={formik.touched.name}
                        error={formik.errors.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <InputField
                        type="password"
                        id="password"
                        name="password"
                        placeholder="."
                        value={formik.values.password}
                        label={t('register.password')}
                        require
                        touched={formik.touched.password}
                        error={formik.errors.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <InputField
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="."
                        value={formik.values.confirmPassword}
                        label={t('register.confirmPassword')}
                        require
                        touched={formik.touched.confirmPassword}
                        error={formik.errors.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <div className={cx('accept')}>
                        <label htmlFor="accept">
                            <input
                                type="checkbox"
                                name="accept"
                                id="accept"
                                checked={formik.values.accept}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <span className={cx('checkmark')}></span>
                            <span>{t('register.accept')}</span>
                        </label>
                        {formik.touched.accept && formik.errors.accept && (
                            <span className={cx('form-error')}>{t('register.requiredAccept')}</span>
                        )}
                    </div>
                    <Button type="submit" customClass={style}>
                        {t('register.register')}
                    </Button>
                </form>
                <div className={cx('login')}>
                    <span>{t('register.haveAccount')}</span> <Link to={'/login'}>{t('login.login')}</Link>
                </div>
            </div>
        </main>
    );
}

export default Register;
