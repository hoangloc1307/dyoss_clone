import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { NumberWithCommas } from '~/functions';
import style from './ProductCard.module.scss';

const cx = classNames.bind(style);

function ProductCard({ product, customClass }) {
    const images = JSON.parse(product.images);

    return (
        <Link to={`/product/${product.link}`} className={cx('product-card')}>
            <div
                className={cx(
                    'product-images',
                    customClass?.['product-images']
                )}
            >
                <img src={images[0]} alt={product.name} />
                {images[1] && (
                    <img
                        src={images[1]}
                        alt={product.name}
                        className={cx('image-hover')}
                    />
                )}
            </div>
            <h3 className={cx('product-name', customClass?.['product-name'])}>
                {product.name}
            </h3>
            <p className={cx('product-price', customClass?.['product-price'])}>
                {product.stock > 0
                    ? `${NumberWithCommas(product.price)}đ`
                    : 'Hết hàng'}
            </p>
        </Link>
    );
}

export default ProductCard;
