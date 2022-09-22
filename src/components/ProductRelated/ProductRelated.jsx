import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import style from './ProductRelated.module.scss';
import ProductByCategory from '~/components/ProductByCategory';
import { selectProductsRelated } from '~/features/products';

const cx = classNames.bind(style);

function ProductRelated({ product }) {
    const productsRelated = useSelector(state =>
        selectProductsRelated(
            state,
            product.id,
            product.type,
            product.category,
            3
        )
    );
    return (
        <div className={cx('product-related')}>
            <ProductByCategory
                title={'Sản phẩm liên quan'}
                listProduct={productsRelated}
                column={4}
            />
        </div>
    );
}

export default ProductRelated;
