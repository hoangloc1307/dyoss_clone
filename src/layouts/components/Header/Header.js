import classNames from 'classnames/bind';

import style from './Header.module.scss';

const cx = classNames.bind(style);

function Header() {
    return (
        <header className={cx('wrapper')}>
            {/* Top bar */}
            <div className={cx('container')}>fsdf</div>
            {/* End top bar */}
        </header>
    );
}

export default Header;
