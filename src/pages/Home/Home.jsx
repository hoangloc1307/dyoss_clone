import { useEffect } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import style from './Home.module.scss';
import images from '~/assets/images';
import ProductByCategory from '~/components/ProductByCategory';
import ProductSlider from '~/components/ProductSlider';
import Button from '~/components/Button';
import {
    fetchProducts,
    selectAllProducts,
} from '~/features/products/productsSlice';

const cx = classNames.bind(style);

function Home() {
    const dispatch = useDispatch();

    const products = useSelector(selectAllProducts);
    console.log(products);

    const productStatus = useSelector((state) => state.products.status);

    const error = useSelector((state) => state.products.error);

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
                        Sự tối giản luôn hợp thời.
                    </p>
                </div>
            </div>
            {/* End Hero */}

            {/* Selling */}
            <div className={cx('selling')}>
                <div className={cx('container')}>
                    <ProductByCategory
                        title={'Mẫu bán chạy'}
                        description={''}
                        listProduct={products}
                    />
                </div>
            </div>
            {/* End Selling */}

            {/* Product Slider */}
            <div className={cx('sex-block')}>
                <div className={cx('category')}>
                    <img src={images.womenCategory} alt="Women product" />
                    <h2>Đồng hồ nữ</h2>
                    <Button href={'/'}>Xem tất cả</Button>
                </div>
                <div className={cx('product-slider')}>
                    <ProductSlider listProduct={products} />
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
                    <Button href={'/'}>Tìm hiểu thêm</Button>
                </div>
                <div className={cx('photo')}>
                    <img src={images.aboutImage} alt="Men product" />
                </div>
            </div>

            <div className={cx('sex-block')}>
                <div className={cx('category')}>
                    <img src={images.menCategory} alt="Men product" />
                    <h2>Đồng hồ nam</h2>
                    <Button href={'/'}>Xem tất cả</Button>
                </div>
                <div className={cx('product-slider')}>
                    <ProductSlider listProduct={products} />
                </div>
            </div>
        </main>
    );
}

export default Home;
