import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import classNames from 'classnames/bind';

import style from './ScrollToTop.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);

function ScrollToTop({ children }) {
    const location = useLocation();

    const [show, setShow] = useState(false);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            // behavior: 'smooth',
        });
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            setShow(window.scrollY >= 1000);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            {children}
            <div className={cx('scroll-top', { show })} onClick={handleScrollToTop}>
                <FontAwesomeIcon icon={faCaretUp} />
            </div>
        </>
    );
}

export default ScrollToTop;
