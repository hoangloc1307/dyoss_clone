import classNames from 'classnames/bind';

import style from './ProductByCategory.module.scss';
import ProductCard from '../ProductCard';

const cx = classNames.bind(style);

function ProductByCategory({ title, description, listProduct, column = 3 }) {
    return (
        <div className={cx('product-by-category')}>
            <h2 className={cx('product-list-title')}>{title}</h2>
            <p className={cx('product-list-description')}>{description}</p>
            <ul className={cx('product-list')}>
                {listProduct.map((item) => (
                    <li
                        key={item.id}
                        style={{ '--column': column }}
                        className={cx('product-item')}
                    >
                        <ProductCard product={item} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductByCategory;