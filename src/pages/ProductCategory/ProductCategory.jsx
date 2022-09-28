import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import style from './ProductCategory.module.scss';
import * as http from '~/utils/http';
import ProductByCategory from '~/components/ProductByCategory';

const cx = classNames.bind(style);

function ProductCategory() {
    const params = useParams();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        switch (params.type) {
            case 'man':
                http.get(
                    http.Dyoss,
                    'product/collections?type=watch&sex=m'
                ).then(res => setProducts(res));
                break;
            case 'woman':
                http.get(
                    http.Dyoss,
                    'product/collections?type=watch&sex=w'
                ).then(res => setProducts(res));
                break;
            case 'accessory':
                http.get(http.Dyoss, 'product/collections?type=accessory').then(
                    res => setProducts(res)
                );
                break;
            default:
                setProducts([]);
        }
    }, [params.type]);

    return (
        <main className={cx('product-categories')}>
            <div className={cx('container')}>
                {products.length > 0 &&
                    products.map(item => {
                        return (
                            <ProductByCategory
                                key={item.id}
                                title={item.name}
                                description={item.description}
                                listProduct={item.products}
                                column={3}
                            />
                        );
                    })}
            </div>
        </main>
    );
}

export default ProductCategory;
