import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import style from './ProductDetail.module.scss';
import {
    selectProductBySlug,
    selectProductsRelated,
} from '~/features/products';
import ProductSlider from '~/components/ProductSlider';
import Button from '~/components/Button';
import { NumberWithCommas } from '~/functions';
import ProductByCategory from '~/components/ProductByCategory';

const cx = classNames.bind(style);

function ProductDetail() {
    const params = useParams();

    const product = useSelector(state =>
        selectProductBySlug(state, params.slug)
    );

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
        <main className={cx('product-detail-page')}>
            <div className={cx('container')}>
                <div className={cx('product-detail')}>
                    <div className={cx('image-detail')}>
                        <ProductSlider
                            listData={product.image}
                            image
                            customClass={style}
                        />
                    </div>
                    <div className={cx('content-detail')}>
                        <h1 className={cx('name')}>{product.name}</h1>
                        <p className={cx('price')}>
                            {product.stock > 0
                                ? `${NumberWithCommas(product.price)}đ`
                                : 'Hết hàng'}
                        </p>
                        <p className={cx('description')}>
                            {product.description}
                        </p>
                        <div className={cx('buy')}>
                            <Button>Mua ngay</Button>
                        </div>
                        <ul className={cx('features')}>
                            {product.features.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* <div>Banner</div> */}
                <div className={cx('related')}>
                    <ProductByCategory
                        title={'Sản phẩm liên quan'}
                        listProduct={productsRelated}
                        column={4}
                    />
                </div>
                {/* <div>Sản phẩm đã xem</div> */}
            </div>
        </main>
    );
}

export default ProductDetail;
