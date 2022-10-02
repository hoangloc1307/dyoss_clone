import { useEffect } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import style from './Home.module.scss';
import images from '~/assets/images';
import { fetchProducts } from '~/features/products';
import { changeProgress } from '~/features/loader';
import ProductByCategory from '~/components/ProductByCategory';
import ProductSlider from '~/components/ProductSlider';
import Button from '~/components/Button';
import ProductViewed from '~/components/ProductViewed';

const cx = classNames.bind(style);

function Home() {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const productStatus = useSelector(state => state.products.status);
    const sellingProducts = useSelector(state => state.products.sellingProducts);
    const manProducts = useSelector(state => state.products.manProducts);
    const womanProducts = useSelector(state => state.products.womanProducts);

    useEffect(() => {
        if (productStatus === 'idle') {
            dispatch(changeProgress(50));
            dispatch(fetchProducts());
        }
        if (productStatus === 'succeeded') {
            dispatch(changeProgress(100));
        }
    }, [productStatus, dispatch]);

    return (
        <main className={cx('home')}>
            {/* Hero */}
            <div className={cx('hero')}>
                <img src={images.bannerHomePage} alt="Dyoss hero" />
                <div className={cx('hero-content')}>
                    <h1 className={cx('title')}>{t('home.brandName')}</h1>
                    <p className={cx('sub-title')}>{t('home.slogan')}</p>
                </div>
            </div>
            {/* End Hero */}

            {/* Selling */}
            <div className={cx('selling')}>
                <div className={cx('container')}>
                    {sellingProducts.length > 0 && (
                        <ProductByCategory title={t('home.selling')} description={''} listProduct={sellingProducts} />
                    )}
                </div>
            </div>
            {/* End Selling */}

            {/* Product Slider */}
            <div className={cx('sex-block')}>
                <div className={cx('category')}>
                    <img src={images.womenCategory} alt="Women product" />
                    <h2>{t('home.womenWatches')}</h2>
                    <Button to={'/product-category/woman'}>{t('button.viewAll')}</Button>
                </div>
                <div className={cx('product-slider')}>
                    {womanProducts.length > 0 && <ProductSlider listData={womanProducts} navigation autoplaya />}
                </div>
            </div>

            <div className={cx('about-block')}>
                <div className={cx('about-content')}>
                    <h2 className={cx('about-title')}>
                        {t('home.introduce')} <br /> {t('home.brandName')}
                    </h2>
                    <p className={cx('about-description')}>
                        Tuyệt tác mới nhất của Dyoss với thiết kế sang trọng, tối giản, hiện đại đã làm siêu lòng biết
                        bao tín đồ thời trang. Bất ngờ hơn khi có thể phối với bất kì gu thời trang nào mà bạn yêu
                        thích.
                    </p>
                    <div className={cx('about-feature')}>
                        <div className={cx('item')}>
                            <img src={images.feature1} alt="Chống trầy" />
                            <p>{t('home.scratchResistant')}</p>
                        </div>
                        <div className={cx('item')}>
                            <img src={images.feature2} alt="Chống nước" />
                            <p>{t('home.waterResistant')}</p>
                        </div>
                        <div className={cx('item')}>
                            <img src={images.feature3} alt="Máy nhật" />
                            <p>{t('home.miyotaMachine')}</p>
                        </div>
                    </div>
                    <Button to={'/about-us'}>{t('home.moreInfor')}</Button>
                </div>
                <div className={cx('photo')}>
                    <img src={images.aboutImage} alt="Men product" />
                </div>
            </div>

            <div className={cx('sex-block')}>
                <div className={cx('category')}>
                    <img src={images.menCategory} alt="Men product" />
                    <h2>{t('home.menWatches')}</h2>
                    <Button to={'/product-category/man'}>{t('button.viewAll')}</Button>
                </div>
                <div className={cx('product-slider')}>
                    {manProducts.length > 0 && <ProductSlider listData={manProducts} navigation autoplaya />}
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
