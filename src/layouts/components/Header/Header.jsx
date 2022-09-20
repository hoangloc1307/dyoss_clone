import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';

import style from './Header.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(style);

function Header() {
    const location = useLocation();

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
                            <div className={cx('cart')}>
                                <div className={cx('cart-icon')}>
                                    <div className={cx('cart-amount')}>0</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('navigation')}>
                    <div className={cx('container')}>
                        <ul className={cx('inner')}>
                            <li className={cx('menu-item')}>
                                <Link to={'/'}>The box</Link>
                            </li>
                            <li className={cx('menu-item')}>
                                <Link to={'/'}>Nam</Link>
                            </li>
                            <li className={cx('menu-item')}>
                                <Link to={'/'}>Nữ</Link>
                            </li>
                            <li className={cx('menu-item')}>
                                <Link to={'/'}>Phụ kiện</Link>
                            </li>
                            <li className={cx('menu-item')}>
                                <Link to={'/'}>Gallery</Link>
                            </li>
                            <li className={cx('menu-item')}>
                                <Link to={'/'}>Blogs</Link>
                            </li>
                            <li className={cx('menu-item')}>
                                <Link to={'/'}>Giới thiệu</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
