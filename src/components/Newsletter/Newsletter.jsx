import emailjs from '@emailjs/browser';
import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import Button from '~/components/Button';
import style from './Newsletter.module.scss';

const cx = classNames.bind(style);

function Newsletter() {
    const { t } = useTranslation();

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('newsletter.invalidEmail'),
        }),
        validateOnChange: true,
        onSubmit: values => {
            if (values.email) {
                const mailData = {
                    subject: t('newsletter.subject'),
                    mailTo: values.email,
                    dear: t('newsletter.mailDear'),
                    content: t('newsletter.mailContent'),
                    thanks: t('newsletter.mailThanks'),
                };

                toast.promise(
                    emailjs.send('service_f031n8k', 'template_qfeabqb', mailData, process.env.REACT_APP_EMAILJS_KEY),
                    {
                        pending: t('newsletter.pending'),
                        success: t('newsletter.subject'),
                        error: t('newsletter.error'),
                    },
                    {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 3000,
                        closeOnClick: true,
                    }
                );

                formik.resetForm();
            }
        },
    });

    return (
        <div className={cx('newsletter')}>
            <h4 className={cx('title')}>{t('newsletter.newsletter')}</h4>
            <form className={cx('form')} spellCheck="false" onSubmit={formik.handleSubmit}>
                <input
                    type="text"
                    name="email"
                    placeholder={t('newsletter.newsletterPlaceholder')}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email && (
                    <span className={cx('form-error')}>{t(formik.errors.email)}</span>
                )}
                <Button customClass={style} type="submit">
                    {t('button.submitButton')}
                </Button>
            </form>
        </div>
    );
}

export default Newsletter;
