import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import style from './ScrollToTop.module.scss';

const cx = classNames.bind(style);

function ScrollToTop({ children }) {
    const location = useLocation();

    const [show, setShow] = useState(false);

    useEffect(() => {
        //Scroll to top when navigate
        window.scrollTo({
            top: 0,
        });

        //Remove overflow when pop up is showing
        document.body.style.overflow = 'unset';
    }, [location]);

    useEffect(() => {
        //Show button scroll to top
        const handleScroll = () => {
            setShow(window.scrollY >= 600);
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
