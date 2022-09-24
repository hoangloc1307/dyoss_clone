import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import style from './ProductViewed.module.scss';
import ProductByCategory from '~/components/ProductByCategory';
import { selectProductsById } from '~/features/products';

const cx = classNames.bind(style);

function ProductViewed() {
    const [productsId, setProductsId] = useState([]);

    const products = useSelector(state =>
        selectProductsById(state, productsId)
    );

    useEffect(() => {
        const productViewd = JSON.parse(
            sessionStorage.getItem('productViewed')
        );

        if (productViewd) {
            setProductsId(productViewd);
        }
    }, []);

    return (
        <div className={cx('product-viewed')}>
            <ProductByCategory
                title={'Sản phẩm đã xem'}
                listProduct={products}
                column={3}
            />
        </div>
    );
}

export default ProductViewed;
