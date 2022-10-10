import classNames from 'classnames/bind';

import images from '~/assets/images';
import Button from '~/components/Button';
import style from './PageNotFound.module.scss';

const cx = classNames.bind(style);

function PageNotFound() {
    return (
        <main className={cx('page-not-found')}>
            <div className={cx('container')}>
                <div className={cx('image')}>
                    <img src={images.pageNotFound.default} alt="Page not found" />
                </div>
                <h1>Rất tiếc! trang này không tồn tại.</h1>
                <Button to={'/'}>Quay lại trang chủ</Button>
            </div>
        </main>
    );
}

export default PageNotFound;
