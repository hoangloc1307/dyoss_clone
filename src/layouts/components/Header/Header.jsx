import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import i18n from '~/i18n';

import { menuHeader } from '~/assets/datas';
import images from '~/assets/images';
import Cart from '~/components/Cart';
import Search from '~/components/Search';
import style from './Header.module.scss';
import { useSelector } from 'react-redux';
import UserOption from '~/components/UserOption';

const cx = classNames.bind(style);

function Header() {
    const location = useLocation();
    const { t } = useTranslation();

    const userLogin = useSelector(state => state.user);

    const [homePage, setHomePage] = useState(false);

    useEffect(() => {
        setHomePage(location.pathname === '/' ? true : false);
    }, [location.pathname]);

    return (
        <header className={cx('header', { 'home-page': homePage })}>
            <div className={cx('topbar')}>
                <div className={cx('container')}>
                    <div className={cx('inner')}>
                        <div className={cx('topbar-left')}>
                            <Link to={'/'} className={cx('left-item')}>
                                <img src={images.logoWhite} alt="Dyoss" />
                            </Link>
                            <Link to={'/'} className={cx('left-item')}>
                                <img src={images.customLogo} alt="Dyoss Custom" />
                            </Link>
                            <Link to={'/'} className={cx('left-item')}>
                                <img src={images.neoLogo} alt="Dyoss Neo" />
                            </Link>
                        </div>
                        <div className={cx('topbar-right')}>
                            {!userLogin.isLogin ? (
                                <div className={cx('login-options')}>
                                    <Link to={'/login'} className={cx('right-item')}>
                                        {t('header.login')}
                                    </Link>
                                    <Link to={'/register'} className={cx('right-item')}>
                                        {t('header.register')}
                                    </Link>
                                </div>
                            ) : (
                                <UserOption username={userLogin.user.name} />
                            )}
                            <div className={cx('right-item', 'flag')}>
                                {i18n.language === 'en' ? (
                                    <img
                                        src={images.flagVN}
                                        alt="Tiếng Việt"
                                        onClick={() => i18n.changeLanguage('vi')}
                                    />
                                ) : (
                                    <img src={images.flagEN} alt="English" onClick={() => i18n.changeLanguage('en')} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('header-main')}>
                <div className={cx('middle')}>
                    <div className={cx('container')}>
                        <div className={cx('inner')}>
                            <Search customClass={style} />
                            <Link to={'/'} className={cx('logo')}>
                                <img src={images.logoBlack} alt="Dyoss Logo" />
                            </Link>
                            <Cart customClass={style} />
                        </div>
                    </div>
                </div>

                <div className={cx('navigation')}>
                    <div className={cx('container')}>
                        <ul className={cx('inner')}>
                            {menuHeader.map((item, index) => (
                                <li
                                    key={index}
                                    className={cx('menu-item', {
                                        active: location.pathname.includes(item.link),
                                    })}
                                >
                                    <Link to={item.link}>{t(`header.${item.title}`)}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
