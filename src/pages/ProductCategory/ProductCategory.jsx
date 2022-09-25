import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import style from './ProductCategory.module.scss';
import {
    selectProductCategoriesByType,
    selectProductsByType,
} from '~/features/products';
import ProductByCategory from '~/components/ProductByCategory';

const cx = classNames.bind(style);

function ProductCategory() {
    const params = useParams();

    const categories = useSelector(state =>
        selectProductCategoriesByType(state, params.type)
    ).sort((prev, next) => next.id - prev.id);

    const products = useSelector(state =>
        selectProductsByType(state, params.type)
    );

    return (
        <main className={cx('product-categories')}>
            <div className={cx('container')}>
                {categories.map(category => {
                    const listProduct = products.filter(
                        product => product.category === category.id
                    );

                    return (
                        <ProductByCategory
                            key={category.id}
                            title={category.name}
                            description={category.description}
                            listProduct={listProduct}
                            column={3}
                        />
                    );
                })}
            </div>
        </main>
    );
}

export default ProductCategory;
