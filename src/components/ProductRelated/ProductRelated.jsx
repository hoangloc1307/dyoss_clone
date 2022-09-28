import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import style from './ProductRelated.module.scss';
import ProductByCategory from '~/components/ProductByCategory';
import * as http from '~/utils/http';

const cx = classNames.bind(style);

function ProductRelated({ product }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        http.get(http.Dyoss, `product/related/${product.id}`).then(res =>
            setProducts(res)
        );
    }, [product]);
    return (
        <div className={cx('product-related')}>
            <ProductByCategory
                title={'Sản phẩm liên quan'}
                listProduct={products}
                column={4}
            />
        </div>
    );
}

export default ProductRelated;
