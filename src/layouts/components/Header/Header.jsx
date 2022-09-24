import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';

import style from './Header.module.scss';
import images from '~/assets/images';
import { menuHeader } from '~/assets/datas';
import Cart from '~/components/Cart';

const cx = classNames.bind(style);

function Header() {
    const location = useLocation();

    const [homePage, setHomePage] = useState(false);

    useEffect(() => {
        setHomePage(location.pathname === '/' ? true : false);
        console.log(location.pathname);
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
                                <img
                                    src={images.customLogo}
                                    alt="Dyoss Custom"
                                />
                            </Link>
                            <Link to={'/'} className={cx('left-item')}>
                                <img src={images.neoLogo} alt="Dyoss Neo" />
                            </Link>
                            <a href="tel:0123456789" className={cx('hotline')}>
                                HOTLINE: 0123 456 789
                            </a>
                        </div>
                        <div className={cx('topbar-right')}>
                            <Link to={'/'} className={cx('right-item')}>
                                ĐĂNG NHẬP
                            </Link>
                            <Link to={'/'} className={cx('right-item')}>
                                ĐĂNG KÝ
                            </Link>
                            <Link to={'/'} className={cx('right-item', 'flag')}>
                                <img src={images.flagVN} alt="Tiếng Việt" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('header-main')}>
                <div className={cx('middle')}>
                    <div className={cx('container')}>
                        <div className={cx('inner')}>
                            <div className={cx('search')}>
                                <div className={cx('search-icon')}></div>
                            </div>
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
                                        active: location.pathname.includes(
                                            item.link
                                        ),
                                    })}
                                >
                                    <Link to={item.link}>{item.title}</Link>
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
