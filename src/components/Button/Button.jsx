import classNames from 'classnames/bind';

import style from './Button.module.scss';

const cx = classNames.bind(style);

function Button({ children, href }) {
    let Tag = 'button';

    const props = {};

    if (href) {
        Tag = 'a';
        props.href = href;
    }

    return (
        <Tag className={cx('button')} {...props}>
            {children}
        </Tag>
    );
}

export default Button;
