import classNames from 'classnames/bind';

import style from './Home.module.scss';
import images from '~/assets/images';
import products from '~/assets/datas/products';
import ProductByCategory from '~/components/ProductByCategory';
import ProductSlider from '~/components/ProductSlider';

const cx = classNames.bind(style);

function Home() {
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
                </div>
                <div className={cx('product-slider')}>
                    <ProductSlider listProduct={products} />
                </div>
            </div>
        </main>
    );
}

export default Home;
