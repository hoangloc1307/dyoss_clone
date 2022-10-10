import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import images from '~/assets/images';
import style from './Loader.module.scss';

const cx = classNames.bind(style);

function Loader() {
    const status = useSelector(state => state.loader.status);
    return (
        <div className={cx('loader', { show: status })}>
            <div className={cx('loader-container')}>
                <img src={images.loading2} alt="Loading" />
            </div>
        </div>
    );
}

export default Loader;
