import classNames from 'classnames/bind';
import Button from '~/components/Button';

import style from './Footer.module.scss';
import { menuFooter, showrooms } from '~/assets/datas/footer';

const cx = classNames.bind(style);

function Footer() {
    return (
        <footer className={cx('footer')}>
            <div className={cx('container')}>
                <div className={cx('newsletter')}>
                    <h4 className={cx('title')}>Newsletter</h4>
                    <form className={cx('form')}>
                        <input
                            type="email"
                            placeholder="Nhập email để nhận ngay những ưu đãi..."
                        />
                        <Button customClass={style}>Submit</Button>
                    </form>
                </div>
                <div className={cx('footer-menu')}>
                    {menuFooter.map((menu, index) => (
                        <div className={cx('menu-block')} key={index}>
                            <h3 className={cx('title')}>{menu.title}</h3>
                            <ul className={cx('list-item')}>
                                {menu.list.map((item, index) => (
                                    <li key={index}>
                                        <a href={item.link}>{item.title}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className={cx('showrooms')}>
                    {showrooms.map((item, index) => (
                        <div className={cx('showroom')} key={index}>
                            <h4 className={cx('name')}>{item.name}</h4>
                            <p className={cx('address')}>
                                Địa chỉ: {item.address}
                            </p>
                            <p className={cx('hotline')}>
                                Hotline: {item.hotline}
                            </p>
                        </div>
                    ))}
                </div>
                <div className={cx('copyright')}>
                    <p>Dyoss clone to learning React.</p>
                    <div className={cx('link')}>
                        <a href="/">Điều khoản điều kiện</a>
                        <a href="/">Chính sách bảo mật</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
