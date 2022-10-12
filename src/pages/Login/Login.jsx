import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import Button from '~/components/Button';
import InputField from '~/components/InputField';
import { setCurrentUser } from '~/features/user/userSlice';
import * as http from '~/utils/http';
import style from './Login.module.scss';

const cx = classNames.bind(style);

function Login() {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            user: '',
            password: '',
            remember: false,
        },
        validationSchema: Yup.object({
            user: Yup.string().required('login.userError'),
            password: Yup.string().required('login.passwordError'),
        }),
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: values => {
            http.post(http.Dyoss, 'auth/login', { username: values.user, password: values.password })
                .then(res => {
                    localStorage.setItem('accessToken', res.accessToken);
                    dispatch(setCurrentUser(res.accessToken));
                    navigate('/');
                })
                .catch(err => {
                    const errorCode = err.response.data.status;
                    toast.error(t(`login.errors.${errorCode}`), {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 3000,
                        closeOnClick: true,
                    });
                });
        },
    });

    return (
        <main className={cx('login-page')}>
            <div className={cx('container')}>
                <h2 className={cx('title')}>{t('login.login')}</h2>
                <form className={cx('login-form')} onSubmit={formik.handleSubmit} spellCheck="false">
                    <InputField
                        type="text"
                        id="username"
                        name="user"
                        placeholder="."
                        value={formik.values.user}
                        label={t('login.user')}
                        require
                        touched={formik.touched.user}
                        error={formik.errors.user}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <InputField
                        type="password"
                        id="password"
                        name="password"
                        placeholder="."
                        value={formik.values.password}
                        label={t('login.password')}
                        require
                        touched={formik.touched.password}
                        error={formik.errors.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <div className={cx('options')}>
                        <div className={cx('remember')}>
                            <label htmlFor="remember">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    name="remember"
                                    checked={formik.values.remember}
                                    onChange={formik.handleChange}
                                />
                                <span className={cx('checkmark')}></span>
                                {t('login.remember')}
                            </label>
                        </div>
                        <div className={cx('forgot')}>
                            {t('login.forgot')}? <Link to={'/'}>{t('login.clickHere')}</Link>
                        </div>
                    </div>
                    <Button type="submit" customClass={style}>
                        {t('login.login')}
                    </Button>
                </form>
                <div className={cx('login-with')}>
                    <span>{t('login.orLogin')}</span>
                </div>
                <div className={cx('login-with-buttons')}>
                    <Button customClass={style}>
                        <FontAwesomeIcon icon={faFacebookF} className={cx('icon')} />
                        <span className={cx('text')}>Facebook</span>
                    </Button>
                    <Button customClass={style}>
                        <FontAwesomeIcon icon={faGoogle} className={cx('icon')} />
                        <span className={cx('text')}>Google</span>
                    </Button>
                </div>
                <div className={cx('register')}>
                    <span>{t('login.dontHaveAccount')}</span> <Link to={'/register'}>{t('register.register')}</Link>
                </div>
            </div>
        </main>
    );
}

export default Login;
