import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import style from './ProductCategory.module.scss';
import * as http from '~/utils/http';
import ProductByCategory from '~/components/ProductByCategory';
import { changeProgress } from '~/features/loader';

const cx = classNames.bind(style);

function ProductCategory() {
    const dispatch = useDispatch();
    const params = useParams();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        dispatch(changeProgress(50));
        let url;
        switch (params.type) {
            case 'box':
                url = 'product/collections?type=box';
                break;
            case 'man':
                url = 'product/collections?type=watch&sex=m';
                break;
            case 'woman':
                url = 'product/collections?type=watch&sex=w';
                break;
            case 'accessory':
                url = 'product/collections?type=strap,bracelet';
                break;
            default:
        }

        http.get(http.Dyoss, url).then(res => {
            setProducts(res);
            dispatch(changeProgress(100));
        });
    }, [params.type, dispatch]);

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
