import classNames from 'classnames/bind';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import style from './Button.module.scss';

const cx = classNames.bind(style);

function Button({ children, href, to, customClass, ...passProps }) {
    let Tag = 'button';

    const props = {
        ...passProps,
    };

    if (href) {
        Tag = 'a';
        props.href = href;
    } else if (to) {
        Tag = Link;
        props.to = to;
    }

    return (
        <Tag className={cx('button', customClass?.['button'])} {...props}>
            {children}
        </Tag>
    );
}

export default memo(Button);
