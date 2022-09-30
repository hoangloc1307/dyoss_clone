import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import style from './Gallery.module.scss';
import * as http from '~/utils/http';
import { changeProgress } from '~/features/loader';
import TopLoading from '~/components/TopLoading';

const cx = classNames.bind(style);

function Gallery() {
    const dispatch = useDispatch();
    const [listImages, setLitImages] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [itemSelecting, setItemSelecting] = useState({});

    useEffect(() => {
        dispatch(changeProgress(50));
        http.get(
            http.Instagram,
            `me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=${process.env.REACT_APP_INSTAGRAM_KEY}`
        ).then(res => {
            setLitImages(res.data);
            dispatch(changeProgress(100));
        });
    }, [dispatch]);

    useEffect(() => {
        if (showDetail) {
            console.log('goi api lay thong tin san pham lien quan');
        }
    }, [showDetail]);

    const handleImageClick = item => {
        setShowDetail(true);
        setItemSelecting(item);
    };

    return (
        <main className={cx('gallery-page')}>
            <TopLoading />
            {listImages.length > 0 && (
                <ul className={cx('images')}>
                    {listImages.map(item => (
                        <li
                            className={cx('image')}
                            key={item.id}
                            onClick={() => handleImageClick(item)}
                        >
                            <img src={item.media_url} alt={item.caption} />
                            <div className={cx('view')}>
                                <FontAwesomeIcon
                                    icon={faInstagram}
                                    className={cx('icon')}
                                />
                                <p>Xem chi tiết</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {showDetail && (
                <div className={cx('detail-popup')}>
                    <div className={cx('popup-container')}>
                        <div className={cx('detail-image')}>
                            <img
                                src={itemSelecting.media_url}
                                alt={itemSelecting.caption}
                            />
                        </div>
                        <div className={cx('detail-content')}>
                            <a
                                href={itemSelecting.permalink}
                                target="_blank"
                                rel="noreferrer"
                            >{`instagram || ${new Date(
                                itemSelecting.timestamp
                            ).toLocaleDateString('vi-VN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}`}</a>
                            <p className={cx('caption')}>
                                {itemSelecting.caption.slice(
                                    0,
                                    itemSelecting.caption.indexOf(
                                        'Link sản phẩm:'
                                    )
                                )}
                            </p>
                        </div>
                        <FontAwesomeIcon
                            icon={faXmark}
                            className={cx('close-btn')}
                            onClick={() => setShowDetail(false)}
                        />
                    </div>
                </div>
            )}
        </main>
    );
}

export default Gallery;
