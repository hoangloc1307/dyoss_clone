import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Thumbs } from 'swiper';
import classNames from 'classnames/bind';
import { useRef, useState } from 'react';

import style from './ProductSlider.module.scss';
import 'swiper/css/bundle';
import ProductCard from '../ProductCard';

const cx = classNames.bind(style);

function ProductSlider({
    listData,
    navigation = false,
    autoplay = false,
    image = false,
    customClass,
}) {
    const btnPrevRef = useRef(null);
    const btnNextRef = useRef(null);

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className={cx('slider')}>
            {/* Button custom */}
            {navigation && (
                <div className={cx('btn-controls')}>
                    <button className={cx('btn-prev')} ref={btnPrevRef}>
                        Previous
                    </button>
                    <button className={cx('btn-next')} ref={btnNextRef}>
                        Next
                    </button>
                </div>
            )}

            {/* Main slide */}
            <Swiper
                modules={[Navigation, Autoplay, Thumbs]}
                loop={true}
                className={cx('slides', customClass?.['slides'])}
                spaceBetween={12}
                speed={1000}
                tag="div"
                wrapperTag="ul"
                autoplay={
                    autoplay
                        ? {
                              delay: 1500,
                              disableOnInteraction: false,
                              pauseOnMouseEnter: true,
                          }
                        : false
                }
                navigation={
                    navigation
                        ? {
                              prevEl: btnPrevRef.current,
                              nextEl: btnNextRef.current,
                          }
                        : false
                }
                thumbs={
                    image
                        ? {
                              swiper: thumbsSwiper,
                              slideThumbActiveClass: cx('thumbs-active'),
                          }
                        : false
                }
                onBeforeInit={swiper => {
                    swiper.params.navigation.prevEl = btnPrevRef.current;
                    swiper.params.navigation.nextEl = btnNextRef.current;
                }}
            >
                {listData.map((item, index) => (
                    <SwiperSlide key={index} className={cx('slide')} tag="li">
                        {image ? (
                            <div className={cx('image-card')}>
                                <img src={item} alt={`Product ${index}`} />
                            </div>
                        ) : (
                            <ProductCard product={item} customClass={style} />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Thumbs */}
            {image ? (
                <Swiper
                    modules={[Thumbs]}
                    watchSlidesProgress={true}
                    onSwiper={setThumbsSwiper}
                    className={cx('slides-thumbs')}
                    slidesPerView={4}
                    spaceBetween={10}
                >
                    {listData.map((item, index) => (
                        <SwiperSlide
                            key={index}
                            className={cx('slide')}
                            tag="li"
                        >
                            <img src={item} alt={`Product ${index}`} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                false
            )}
        </div>
    );
}

export default ProductSlider;
