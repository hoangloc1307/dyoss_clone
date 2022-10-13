import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '~/features/user/userSlice';

import style from './UserOption.module.scss';

const cx = classNames.bind(style);

function UserOption({ username }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div>
            <Tippy
                interactive
                delay={[0, 300]}
                placement="bottom"
                render={attrs => (
                    <div className={cx('wrapper')} tabIndex="-1" {...attrs}>
                        <ul className={cx('options')}>
                            <li>
                                <Link>Thông tin cá nhân</Link>
                            </li>
                            <li>
                                <Link>Thông tin đơn hàng</Link>
                            </li>
                            <li>
                                <span
                                    onClick={() => {
                                        dispatch(logOut());
                                        navigate('/');
                                    }}
                                >
                                    Đăng xuất
                                </span>
                            </li>
                        </ul>
                    </div>
                )}
            >
                <div className={cx('user-options')}>
                    <FontAwesomeIcon icon={faUser} className={cx('icon')} />
                    <p className={cx('name')}>{username}</p>
                </div>
            </Tippy>
        </div>
    );
}

export default UserOption;
