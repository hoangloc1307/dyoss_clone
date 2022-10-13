import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import i18n from '~/i18n';

import { menuFooter, showrooms } from '~/assets/datas';
import Newsletter from '~/components/Newsletter';
import style from './Footer.module.scss';

const cx = classNames.bind(style);

function Footer() {
    const { t } = useTranslation();

    return (
        <footer className={cx('footer')}>
            <div className={cx('container')}>
                <Newsletter />
                <div className={cx('footer-menu')}>
                    {menuFooter.map((menu, index) => (
                        <div className={cx('menu-block')} key={index}>
                            <h3 className={cx('title')}>{menu[`title${i18n.language}`]}</h3>
                            <ul className={cx('list-item')}>
                                {menu.list.map((item, index) => (
                                    <li key={index}>
                                        <Link to={item.link}>{item[`title${i18n.language}`]}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className={cx('showrooms')}>
                    {showrooms.map((item, index) => (
                        <div className={cx('showroom')} key={index}>
                            <h4 className={cx('name')}>{item[`name${i18n.language}`]}</h4>
                            <p className={cx('address')}>
                                {t('footer.address')}: {item[`address${i18n.language}`]}
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
