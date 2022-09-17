import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import classNames from 'classnames/bind';
import { useRef } from 'react';

import style from './ProductSlider.module.scss';
import 'swiper/css/bundle';
import ProductCard from '../ProductCard';

const cx = classNames.bind(style);

function ProductSlider({ listProduct }) {
    const btnPrevRef = useRef(null);
    const btnNextRef = useRef(null);

    return (
        <div className={cx('slider')}>
            <div className={cx('btn-controls')}>
                <button className={cx('btn-prev')} ref={btnPrevRef}>
                    Previous
                </button>
                <button className={cx('btn-next')} ref={btnNextRef}>
                    Next
                </button>
            </div>

            <Swiper
                modules={[Navigation, Autoplay]}
                loop={true}
                className={cx('slides')}
                spaceBetween={12}
                speed={1000}
                tag="div"
                wrapperTag="ul"
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                navigation={{
                    prevEl: btnPrevRef.current,
                    nextEl: btnNextRef.current,
                }}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = btnPrevRef.current;
                    swiper.params.navigation.nextEl = btnNextRef.current;
                }}
            >
                {listProduct.map((item) => (
                    <SwiperSlide key={item.id} className={cx('slide')} tag="li">
                        <ProductCard product={item} customClass={style} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default ProductSlider;
