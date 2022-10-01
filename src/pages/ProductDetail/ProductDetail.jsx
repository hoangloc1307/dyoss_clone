import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import _ from 'lodash';

import style from './ProductDetail.module.scss';
import { NumberWithCommas } from '~/functions';
import * as http from '~/utils/http';
import { addToCart } from '~/features/cart';
import { changeProgress } from '~/features/loader';
import ProductSlider from '~/components/ProductSlider';
import Button from '~/components/Button';
import ProductByCategory from '~/components/ProductByCategory';

const cx = classNames.bind(style);

function ProductDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);

    //Get product detail
    useEffect(() => {
        dispatch(changeProgress(50));
        http.get(http.Dyoss, `product/detail/${params.slug}/4`).then(
            response => {
                if (!_.isEmpty(response)) {
                    const prod = response.detail;
                    prod.features = JSON.parse(prod.features);
                    prod.images = JSON.parse(prod.images);
                    setProduct(prod);
                    setRelatedProducts(response.relatedProducts);
                    dispatch(changeProgress(80));
                } else {
                    navigate('/');
                }
            }
        );
    }, [params.slug, dispatch, navigate]);

    //Save into session storage
    useEffect(() => {
        if (!isEmpty(product)) {
            let items;
            const products = sessionStorage.getItem('productViewed');
            if (products) {
                items = JSON.parse(sessionStorage.getItem('productViewed'));
                if (!items.includes(product.id)) {
                    if (items.length > 5) {
                        items.shift();
                    }
                    items.push(product.id);
                } else {
                    const index = items.indexOf(product.id);
                    items.splice(index, 1);
                    items.push(product.id);
                }
            } else {
                items = [product.id];
            }
            sessionStorage.setItem('productViewed', JSON.stringify(items));
            dispatch(changeProgress(100));
        }
    }, [product, dispatch]);

    return (
        <>
            {!isEmpty(product) && (
                <main className={cx('product-detail-page')}>
                    <div className={cx('container')}>
                        <div className={cx('product-detail')}>
                            <div className={cx('image-detail')}>
                                {product.images.length > 0 && (
                                    <ProductSlider
                                        listData={product.images}
                                        image
                                        customClass={style}
                                    />
                                )}
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
                                {product.stock > 0 && (
                                    <div className={cx('buy')}>
                                        <Button
                                            onClick={() => {
                                                dispatch(
                                                    addToCart({
                                                        id: product.id,
                                                        name: product.name,
                                                        price: product.price,
                                                        link: product.link,
                                                        image: product
                                                            .images[0],
                                                        total: 1,
                                                    })
                                                );
                                            }}
                                        >
                                            Mua ngay
                                        </Button>
                                    </div>
                                )}
                                <ul className={cx('features')}>
                                    {product.features.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className={cx('product-related')}>
                            <ProductByCategory
                                title={'Sản phẩm liên quan'}
                                listProduct={relatedProducts}
                                column={4}
                            />
                        </div>
                    </div>
                </main>
            )}
        </>
    );
}

export default ProductDetail;
