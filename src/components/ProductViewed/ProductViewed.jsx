import classNames from 'classnames/bind';
import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ProductByCategory from '~/components/ProductByCategory';
import * as http from '~/utils/http';
import style from './ProductViewed.module.scss';

const cx = classNames.bind(style);

function ProductViewed() {
    const { t } = useTranslation();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const productViewd = sessionStorage.getItem('productViewed');

        if (productViewd) {
            http.get(http.Dyoss, `product?column=id,name,price,stock,images,link&id=${productViewd}`).then(res => {
                const orderList = [];
                productViewd.split(',').map(id => {
                    const product = res.find(item => item.id === parseInt(id));
                    orderList.push(product);
                    return null;
                });
                setProducts(orderList.reverse());
            });
        }
    }, []);

    return (
        <div className={cx('product-viewed')}>
            {products.length > 0 && <ProductByCategory title={t('viewedProduct')} listProduct={products} column={3} />}
        </div>
    );
}

export default memo(ProductViewed);
