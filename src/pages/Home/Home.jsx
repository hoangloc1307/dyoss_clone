import { useEffect } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import style from './Home.module.scss';
import images from '~/assets/images';
import {
    fetchProducts,
    selectProductsByType,
    selectSellingProducts,
} from '~/features/products';
import ProductByCategory from '~/components/ProductByCategory';
import ProductSlider from '~/components/ProductSlider';
import Button from '~/components/Button';
import ProductViewed from '~/components/ProductViewed';

const cx = classNames.bind(style);

function Home() {
    const dispatch = useDispatch();

    const { t } = useTranslation();

    const productStatus = useSelector(state => state.products.status);
    // const error = useSelector((state) => state.products.error);
    const sellingProducts = useSelector(state =>
        selectSellingProducts(state, 3)
    );
    const manProducts = useSelector(state => selectProductsByType(state, 'man'))
        .filter(item => item.stock > 0)
        .sort((prev, next) => next.view - prev.view)
        .slice(0, 5);

    const womanProducts = useSelector(state =>
        selectProductsByType(state, 'woman')
    )
        .filter(item => item.stock > 0)
        .sort((prev, next) => next.view - prev.view)
        .slice(0, 5);

    useEffect(() => {
        if (productStatus === 'idle') {
            dispatch(fetchProducts());
        }
    }, [productStatus, dispatch]);

    return (
        <main className={cx('home')}>
            {/* Hero */}
            <div className={cx('hero')}>
                <img src={images.bannerHomePage} alt="Dyoss hero" />
                <div className={cx('hero-content')}>
                    <h1 className={cx('title')}>Dyoss Watch</h1>
                    <p className={cx('sub-title')}>
                        {t('Sự tối giản luôn hợp thời.')}
                    </p>
                </div>
            </div>
            {/* End Hero */}

            {/* Selling */}
            <div className={cx('selling')}>
                <div className={cx('container')}>
                    {sellingProducts.length > 0 && (
                        <ProductByCategory
                            title={'Mẫu bán chạy'}
                            description={''}
                            listProduct={sellingProducts}
                        />
                    )}
                </div>
            </div>
            {/* End Selling */}

            {/* Product Slider */}
            <div className={cx('sex-block')}>
                <div className={cx('category')}>
                    <img src={images.womenCategory} alt="Women product" />
                    <h2>Đồng hồ nữ</h2>
                    <Button to={'/product-category/woman'}>Xem tất cả</Button>
                </div>
                <div className={cx('product-slider')}>
                    {womanProducts.length > 0 && (
                        <ProductSlider
                            listData={womanProducts}
                            navigation
                            autoplay
                        />
                    )}
                </div>
            </div>

            <div className={cx('about-block')}>
                <div className={cx('about-content')}>
                    <h2 className={cx('about-title')}>
                        Giới thiệu <br /> Dyoss Watch
                    </h2>
                    <p className={cx('about-description')}>
                        Tuyệt tác mới nhất của Dyoss với thiết kế sang trọng,
                        tối giản, hiện đại đã làm siêu lòng biết bao tín đồ thời
                        trang. Bất ngờ hơn khi có thể phối với bất kì gu thời
                        trang nào mà bạn yêu thích.
                    </p>
                    <div className={cx('about-feature')}>
                        <div className={cx('item')}>
                            <img src={images.feature1} alt="Chống trầy" />
                            <p>Kính Sapphire chống trầy</p>
                        </div>
                        <div className={cx('item')}>
                            <img src={images.feature2} alt="Chống nước" />
                            <p>Chống nước 5ATM</p>
                        </div>
                        <div className={cx('item')}>
                            <img src={images.feature3} alt="Máy nhật" />
                            <p>Máy Miyota Nhật Bản</p>
                        </div>
                    </div>
                    <Button to={'/about-us'}>Tìm hiểu thêm</Button>
                </div>
                <div className={cx('photo')}>
                    <img src={images.aboutImage} alt="Men product" />
                </div>
            </div>

            <div className={cx('sex-block')}>
                <div className={cx('category')}>
                    <img src={images.menCategory} alt="Men product" />
                    <h2>Đồng hồ nam</h2>
                    <Button to={'/product-category/man'}>Xem tất cả</Button>
                </div>
                <div className={cx('product-slider')}>
                    {manProducts.length > 0 && (
                        <ProductSlider
                            listData={manProducts}
                            navigation
                            autoplay
                        />
                    )}
                </div>
            </div>
            {/* End Product Slider */}

            {/* Viewed Product */}
            <div className={cx('container')}>
                <ProductViewed />
            </div>
            {/* End Viewed Product */}
        </main>
    );
}

export default Home;
