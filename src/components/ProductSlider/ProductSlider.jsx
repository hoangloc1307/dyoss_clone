import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import classNames from 'classnames/bind';

import style from './ProductSlider.module.scss';
import ProductCard from '../ProductCard';

const cx = classNames.bind(style);

function ProductSlider({ listProduct }) {
    return (
        <Splide options={{ height: 360, width: 300, rewind: true }}>
            {listProduct.map((item) => (
                <SplideSlide key={item.id}>
                    <div className={cx('slide')}>
                        <ProductCard product={item} />
                    </div>
                </SplideSlide>
            ))}
        </Splide>
    );
}

export default ProductSlider;
