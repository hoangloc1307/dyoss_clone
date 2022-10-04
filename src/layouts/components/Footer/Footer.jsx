import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '~/i18n';

import style from './Footer.module.scss';
import { menuFooter, showrooms } from '~/assets/datas';
import Button from '~/components/Button';

const cx = classNames.bind(style);

function Footer() {
    const { t } = useTranslation();

    return (
        <footer className={cx('footer')}>
            <div className={cx('container')}>
                <div className={cx('newsletter')}>
                    <h4 className={cx('title')}>Newsletter</h4>
                    <form className={cx('form')}>
                        <input type="email" placeholder={t('footer.newsletterPlaceholder')} />
                        <Button customClass={style}>{t('footer.submitButton')}</Button>
                    </form>
                </div>
                <div className={cx('footer-menu')}>
                    {menuFooter.map((menu, index) => (
                        <div className={cx('menu-block')} key={index}>
                            <h3 className={cx('title')}>{i18n.language === 'vi' ? menu.titleVI : menu.titleEN}</h3>
                            <ul className={cx('list-item')}>
                                {menu.list.map((item, index) => (
                                    <li key={index}>
                                        <Link to={item.link}>
                                            {i18n.language === 'vi' ? item.titleVI : item.titleEN}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className={cx('showrooms')}>
                    {showrooms.map((item, index) => (
                        <div className={cx('showroom')} key={index}>
                            <h4 className={cx('name')}>{item[`name${i18n.language.toUpperCase()}`]}</h4>
                            <p className={cx('address')}>
                                {t('footer.address')}: {item[`address${i18n.language.toUpperCase()}`]}
                            </p>
                            <p className={cx('hotline')}>Hotline: {item.hotline}</p>
                        </div>
                    ))}
                </div>
                <div className={cx('copyright')}>
                    <p>{t('footer.copyright')}</p>
                    <div className={cx('link')}>
                        <a href="/">{t('footer.terms')}</a>
                        <a href="/">{t('footer.privacy')}</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
