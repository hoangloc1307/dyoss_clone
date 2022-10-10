import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faCartPlus, faChevronLeft, faChevronRight, faEye, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import i18n from '~/i18n';

import { addToCart, changeStatus, selectShowStatus } from '~/features/cart';
import { galleryFetchImageInstagram, galleryFetchProducts } from '~/features/gallery';
import * as func from '~/functions';
import style from './Gallery.module.scss';

const cx = classNames.bind(style);

function Gallery() {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const popup = useRef();

    const [showDetail, setShowDetail] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slugArray, setSlugArray] = useState([]);

    const cartShowStatus = useSelector(selectShowStatus);
    const isImagesFetch = useSelector(state => state.gallery.instagramImages.status);
    const listImages = useSelector(state => state.gallery.instagramImages.listImage);
    const isFetched = useSelector(state =>
        state.gallery.fetchStatus.find(item => item.id === listImages[currentIndex]?.id) ? true : false
    );
    const fetchStatus = useSelector(state =>
        state.gallery.fetchStatus.find(item => item.id === listImages[currentIndex]?.id)
    );
    // const fetchStatus = { status: 'loading' };
    const allProduct = useSelector(state => state.gallery.products);
    const products = useSelector(state => state.gallery.products.filter(item => slugArray.includes(item.link)));

    //Fetch images from instagram
    useEffect(() => {
        if (isImagesFetch === 'idle') {
            dispatch(galleryFetchImageInstagram());
        }
        // eslint-disable-next-line
    }, []);

    //Fetch product when change image
    useEffect(() => {
        if (showDetail) {
            //Get slugs in caption and conver to array.
            const slugsFromCaption = func.GetProductSlugsFromCaption(listImages[currentIndex].caption) || [];
            const slugs = slugsFromCaption.map(item => item.replace('/product/', ''));
            //Set slug to get product base on this value.
            setSlugArray(slugs);
            //Check slug is exists on store, if not exists then fetch data.
            const notExistsSlug = slugs.filter(item => !allProduct.map(i => i.link).includes(item));
            if (!isFetched && notExistsSlug.length > 0) {
                const notExistsSlugString = notExistsSlug.join(',');
                dispatch(
                    galleryFetchProducts({
                        id: listImages[currentIndex].id,
                        slugString: notExistsSlugString,
                    })
                );
            }
            //To remove scrollbar when show popup
            document.body.style.overflow = 'hidden';
            //Focus main tag to listen event keydown
            popup.current.focus();
        } else {
            document.body.style.overflow = 'unset';
            popup.current.blur();
        }
        // eslint-disable-next-line
    }, [showDetail, currentIndex]);

    //Handle when click image
    const handleImageClick = index => {
        //Show detail popup
        setShowDetail(true);
        //Hide cart popup
        if (cartShowStatus) {
            dispatch(changeStatus(false));
        }
        //Set current image
        setCurrentIndex(index);
    };

    //Change image by navigation button
    const handleNavigateButtonClick = btn => {
        const listImagesLength = listImages.length;
        let nextViewIndex;

        if (btn === 'next') {
            nextViewIndex = (currentIndex + 1) % listImagesLength;
        } else {
            nextViewIndex = (currentIndex - 1 + listImagesLength) % listImagesLength;
        }

        setCurrentIndex(nextViewIndex);
    };

    const handleKeyDown = e => {
        switch (e.code) {
            case 'Escape':
                setShowDetail(false);
                break;
            case 'ArrowRight':
                handleNavigateButtonClick('next');
                break;
            case 'ArrowLeft':
                handleNavigateButtonClick('prev');
                break;
            case 'Tab':
                e.preventDefault();
                break;
            default:
        }
    };

    const handleAddToCart = item => {
        if (item.type !== 'box') {
            dispatch(addToCart(item.id, item.name, item.price, item.link, JSON.parse(item.images)[0], {}));
            setShowDetail(false);
        } else {
            document.body.style.overflow = 'unset';
            popup.current.blur();
            navigate(`/product/${item.link}`);
        }
    };

    return (
        <main className={cx('gallery-page')} ref={popup} tabIndex={1} onKeyDown={e => handleKeyDown(e)}>
            {listImages.length > 0 && (
                <ul className={cx('images')}>
                    {listImages.map((item, index) => (
                        <li className={cx('image')} key={item.id} onClick={() => handleImageClick(index)}>
                            <img src={item.media_url} alt={item.caption} />
                            <div className={cx('view')}>
                                <FontAwesomeIcon icon={faInstagram} className={cx('icon')} />
                                <p>{t('button.viewDetail')}</p>
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
                            <img
                                src={listImages[currentIndex].media_url}
                                alt={func.GetTitleFromCaption(listImages[currentIndex].caption)}
                            />
                        </div>
                        <div className={cx('detail-content')}>
                            <a
                                href={listImages[currentIndex].permalink}
                                target="_blank"
                                rel="noreferrer"
                            >{`instagram || ${func.ConvertToDateString(
                                listImages[currentIndex].timestamp,
                                i18n.language === 'vi' ? 'vi-VN' : 'en-EN'
                            )}`}</a>
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
                                    <h2 className={cx('title')}>{t('gallery.headingProducts')}</h2>
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
                            {fetchStatus?.status === 'loading' && (
                                <div className={cx('loader')}>
                                    <PulseLoader color={'#000'} />
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
                            <div className={cx('next', 'btn')} onClick={() => handleNavigateButtonClick('next')}>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default Gallery;
