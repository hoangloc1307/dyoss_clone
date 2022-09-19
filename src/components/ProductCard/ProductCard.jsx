import classNames from 'classnames/bind';

import style from './ProductCard.module.scss';

const cx = classNames.bind(style);

function ProductCard({ product, customClass }) {
    return (
        <a href="/" className={cx('product-card')}>
            <div
                className={cx(
                    'product-images',
                    customClass?.['product-images'],
                )}
            >
                <img src={product.image[0]} alt={product.name} />
                <img
                    src={product.image[1]}
                    alt={product.name}
                    className={cx('image-hover')}
                />
            </div>
            <h3 className={cx('product-name')}>{product.name}</h3>
            <p className={cx('product-price')}>
                {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </p>
        </a>
    );
}

export default ProductCard;
