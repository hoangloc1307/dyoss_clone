import classNames from 'classnames/bind';
import { useEffect, useState, memo } from 'react';
import { useTranslation } from 'react-i18next';

import style from './ProductViewed.module.scss';
import * as http from '~/utils/http';
import ProductByCategory from '~/components/ProductByCategory';

const cx = classNames.bind(style);

function ProductViewed() {
    const { t } = useTranslation();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const productViewd = JSON.parse(sessionStorage.getItem('productViewed'));

        if (productViewd) {
            http.get(http.Dyoss, `product/viewed?id=${productViewd.toString()}`).then(res => {
                const orderList = [];
                productViewd.map(id => orderList.push(res.find(item => item.id === id)));
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
