import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { setKeywordValue } from '~/features/search/searchSlice';
import style from './Search.module.scss';

const cx = classNames.bind(style);

function Search({ customClass }) {
    const location = useLocation();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [keyword, setKeyword] = useState('');

    const handleSearchShow = () => {
        setShow(previousState => !previousState);
    };

    const handleSearchClick = e => {
        if (e.type === 'click' || (e.type === 'keydown' && e.code === 'Enter')) {
            dispatch(setKeywordValue(keyword));
            setKeyword('');
            navigate(`/search?name=${keyword}`, { state: { keyword } });
        }
    };

    const handleSearchInputChange = e => {
        setKeyword(e.target.value);
    };

    useEffect(() => {
        if (show) {
            setShow(false);
        }
        // eslint-disable-next-line
    }, [location.pathname]);

    return (
        <div className={cx('search')}>
            <div className={cx('search-icon', customClass?.['search-icon'])} onClick={handleSearchShow}></div>
            {show && (
                <>
                    <span className={cx('search-arrow', customClass?.['search-arrow'])}>
                        <FontAwesomeIcon icon={faCaretDown} />
                    </span>
                    <div className={cx('search-input', customClass?.['search-input'])}>
                        <input
                            type="text"
                            placeholder={t('search.placeHolder')}
                            value={keyword}
                            onChange={e => handleSearchInputChange(e)}
                            onKeyDown={e => handleSearchClick(e)}
                        />
                        <span className={cx('search-button')} onClick={e => handleSearchClick(e)}>
                            {t('button.search')}
                        </span>
                    </div>
                </>
            )}
        </div>
    );
}

export default Search;
