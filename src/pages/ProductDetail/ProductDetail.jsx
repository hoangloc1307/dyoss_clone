import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import style from './ProductDetail.module.scss';
import { selectProductBySlug } from '~/features/products';
import { addToCart } from '~/features/cart';
import ProductSlider from '~/components/ProductSlider';
import Button from '~/components/Button';
import { NumberWithCommas } from '~/functions';
import ProductRelated from '~/components/ProductRelated';
import PageNotFound from '~/pages/PageNotFound';

const cx = classNames.bind(style);

function ProductDetail() {
    const dispatch = useDispatch();

    const params = useParams();

    const product = useSelector(state =>
        selectProductBySlug(state, params.slug)
    );

    return (
        <>
            {product ? (
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
                                    <Button
                                        onClick={() => {
                                            dispatch(
                                                addToCart({
                                                    id: product.id,
                                                    name: product.name,
                                                    price: product.price,
                                                    link: product.link,
                                                    image: product.image[0],
                                                    total: 1,
                                                })
                                            );
                                        }}
                                    >
                                        Mua ngay
                                    </Button>
                                </div>
                                <ul className={cx('features')}>
                                    {product.features.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <ProductRelated product={product} />
                    </div>
                </main>
            ) : (
                <PageNotFound />
            )}
        </>
    );
}

export default ProductDetail;
