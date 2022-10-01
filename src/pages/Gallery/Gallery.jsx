import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faCartPlus, faChevronLeft, faChevronRight, faEye, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import style from './Gallery.module.scss';
import * as http from '~/utils/http';
import { changeProgress } from '~/features/loader';
import * as func from '~/functions';
import { addToCart, changeStatus } from '~/features/cart';

const cx = classNames.bind(style);

function Gallery() {
    const dispatch = useDispatch();
    const [listImages, setLitImages] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [currentIndex, setCurrentIndex] = useState({});
    const [products, setProducts] = useState([]);

    const handleAddToCart = item => {
        dispatch(
            addToCart({
                id: item.id,
                name: item.name,
                price: item.price,
                link: item.link,
                image: JSON.parse(item.images)[0],
                total: 1,
            })
        );

        setShowDetail(false);
    };

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
            setProducts([]);
            let slugString;

            const slugs = func.GetProductSlugsFromCaption(listImages[currentIndex].caption);

            if (slugs) {
                slugString = slugs.join(',').replaceAll('/product/', '');
            }

            if (slugString) {
                dispatch(changeProgress(75));
                http.get(http.Dyoss, `product/search?slug=${slugString}`).then(res => {
                    setProducts(res);
                    dispatch(changeProgress(100));
                });
            }
        }
        // eslint-disable-next-line
    }, [showDetail, currentIndex]);

    const handleImageClick = index => {
        setShowDetail(true);
        dispatch(changeStatus(false));
        setCurrentIndex(index);
    };

    const handleNavigateButtonClick = btn => {
        const listImagesLength = listImages.length;
        let nextViewIndex;

        if (btn === 'next') {
            nextViewIndex = (currentIndex + 1) % listImagesLength;
            setCurrentIndex(nextViewIndex);
        } else {
            nextViewIndex = (currentIndex - 1 + listImagesLength) % listImagesLength;
        }

        setCurrentIndex(nextViewIndex);
    };

    return (
        <main className={cx('gallery-page')}>
            {listImages.length > 0 && (
                <ul className={cx('images')}>
                    {listImages.map((item, index) => (
                        <li className={cx('image')} key={item.id} onClick={() => handleImageClick(index)}>
                            <img src={item.media_url} alt={item.caption} />
                            <div className={cx('view')}>
                                <FontAwesomeIcon icon={faInstagram} className={cx('icon')} />
                                <p>Xem chi tiết</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* Detail popup */}
            {showDetail && (
                <div className={cx('detail-popup')}>
                    <div className={cx('overlay')} onClick={() => setShowDetail(false)}></div>
                    <div className={cx('popup-container')}>
                        <div className={cx('detail-image')}>
                            <img src={listImages[currentIndex].media_url} alt={listImages[currentIndex].caption} />
                        </div>
                        <div className={cx('detail-content')}>
                            <a
                                href={listImages[currentIndex].permalink}
                                target="_blank"
                                rel="noreferrer"
                            >{`instagram || ${new Date(listImages[currentIndex].timestamp).toLocaleDateString('vi-VN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}`}</a>
                            <p className={cx('title')}>{func.GetTitleFromCaption(listImages[currentIndex].caption)}</p>
                            <ul className={cx('hashtags')}>
                                {func.GetTagsFromCaption(listImages[currentIndex].caption).map((tag, index) => (
                                    <li className={cx('tag')} key={index}>
                                        <a
                                            href={`https://www.instagram.com/explore/tags/${tag}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {tag}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            {products.length > 0 && (
                                <div className={cx('products-in-image')}>
                                    <h2 className={cx('title')}>Sản phẩm trong bài viết</h2>
                                    <ul className={cx('products')}>
                                        {products.map(item => (
                                            <li className={cx('product')} key={item.id}>
                                                <div className={cx('product-image')}>
                                                    <img src={JSON.parse(item.images)[0]} alt={item.name} />
                                                    <div className={cx('buttons')}>
                                                        <Link
                                                            to={`/product/${item.link}`}
                                                            className={cx('view-detail')}
                                                        >
                                                            <FontAwesomeIcon icon={faEye} />
                                                        </Link>
                                                        <div
                                                            className={cx('add-to-cart')}
                                                            onClick={() => handleAddToCart(item)}
                                                        >
                                                            <FontAwesomeIcon icon={faCartPlus} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={cx('product-content')}>
                                                    <h3 className={cx('name')}>{item.name}</h3>
                                                    <p className={cx('price')}>{func.NumberWithCommas(item.price)}đ</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className={cx('close-btn')} onClick={() => setShowDetail(false)}>
                            <FontAwesomeIcon icon={faXmark} />
                        </div>
                        <div className={cx('navigate-btn')}>
                            <div className={cx('prev', 'btn')} onClick={() => handleNavigateButtonClick('prev')}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </div>
                            <div className={cx('next', 'btn')}>
                                <FontAwesomeIcon
                                    icon={faChevronRight}
                                    onClick={() => handleNavigateButtonClick('next')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default Gallery;
