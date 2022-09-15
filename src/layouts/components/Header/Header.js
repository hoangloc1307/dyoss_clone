import classNames from 'classnames/bind';

import style from './Header.module.scss';
import { images } from '~/assets';

const cx = classNames.bind(style);

function Header() {
    return (
        <header className={cx('header')}>
            <div className={cx('topbar')}>
                <div className={cx('container')}>
                    <div className={cx('inner')}>
                        <div className={cx('topbar-left')}>
                            <a href="/" className={cx('left-item')}>
                                <img src={images.logoWhite} alt="Dyoss" />
                            </a>
                            <a href="/" className={cx('left-item')}>
                                <img
                                    src={images.customLogo}
                                    alt="Dyoss Custom"
                                />
                            </a>
                            <a href="/" className={cx('left-item')}>
                                <img src={images.neoLogo} alt="Dyoss Neo" />
                            </a>
                            <a href="tel:0123456789" className={cx('hotline')}>
                                HOTLINE: 0123 456 789
                            </a>
                        </div>
                        <div className={cx('topbar-right')}>
                            <a href="/" className={cx('right-item')}>
                                ĐĂNG NHẬP
                            </a>
                            <a href="/" className={cx('right-item')}>
                                ĐĂNG KÝ
                            </a>
                            <a href="/" className={cx('right-item', 'flag')}>
                                <img src={images.flagVN} alt="Tiếng Việt" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('middle')}>
                <div className={cx('container')}>
                    <div className={cx('inner')}>
                        <div className={cx('search')}>
                            <div className={cx('search-icon')}></div>
                        </div>
                        <a href="/" className={cx('logo')}>
                            <img src={images.logoBlack} alt="Dyoss Logo" />
                        </a>
                        <div className={cx('cart')}>
                            <div className={cx('cart-icon')}>
                                <div className={cx('cart-amount')}>0</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
