import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import style from './ProductDetail.module.scss';
import { NumberWithCommas } from '~/functions';
import * as http from '~/utils/http';
import { addToCart } from '~/features/cart';
import { changeProgress } from '~/features/loader';
import ProductSlider from '~/components/ProductSlider';
import Button from '~/components/Button';
import ProductByCategory from '~/components/ProductByCategory';
import ProductOption from '~/components/ProductOption';

const cx = classNames.bind(style);

function ProductDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const params = useParams();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [options, setOptions] = useState({});
    const [optionSelected, setOptionSelected] = useState({});

    //Get product detail
    useEffect(() => {
        dispatch(changeProgress(30));
        http.get(http.Dyoss, `product/detail/${params.slug}/4`).then(response => {
            if (!_.isEmpty(response)) {
                const prod = response.detail;
                prod.features = JSON.parse(prod.features);
                prod.images = JSON.parse(prod.images);
                setProduct(prod);
                setRelatedProducts(response.relatedProducts);
                dispatch(changeProgress(50));
            } else {
                navigate('/');
            }
        });
    }, [params.slug, dispatch, navigate]);

    useEffect(() => {
        if (!isEmpty(product)) {
            //Save into session storage
            let items = sessionStorage.getItem('productViewed') || '';
            if (items) {
                const ids = items.split(',');

                if (!ids.includes(product.id.toString())) {
                    if (ids.length > 5) {
                        ids.shift();
                    }
                    ids.push(product.id);
                } else {
                    const index = ids.indexOf(product.id.toString());
                    ids.splice(index, 1);
                    ids.push(product.id);
                }

                items = ids.join(',');
            } else {
                items += product.id;
            }
            sessionStorage.setItem('productViewed', items);
            dispatch(changeProgress(80));
            //Get box options
            if (product.type === 'box') {
                http.get(http.Dyoss, `product/options/${params.slug}`).then(res => {
                    setOptions(res);
                    dispatch(changeProgress(100));
                });
            } else {
                dispatch(changeProgress(100));
            }
        }
        // eslint-disable-next-line
    }, [product, dispatch]);

    const handleChoseItem = (type, item) => {
        setOptionSelected({ ...optionSelected, [type]: item });
    };

    const handleAddToCart = () => {
        const optionExists = [];
        for (const [key, value] of Object.entries(options)) {
            if (value.length > 0) {
                optionExists.push(key);
            }
        }

        const check = optionExists.every(r => Object.keys(optionSelected).indexOf(r) >= 0);

        if (check) {
            dispatch(
                addToCart(product.id, product.name, product.price, product.link, product.images[0], optionSelected)
            );
            toast.success(t('productDetail.addToCart'), {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                closeOnClick: true,
            });
        } else {
            toast.error(t('productDetail.chooseOption'), {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                closeOnClick: true,
            });
        }
    };

    return (
        <>
            {!isEmpty(product) && (
                <main className={cx('product-detail-page')}>
                    <div className={cx('container')}>
                        <div className={cx('product-detail')}>
                            <div className={cx('image-detail')}>
                                {product.images.length > 0 && (
                                    <ProductSlider listData={product.images} image customClass={style} autoplay />
                                )}
                            </div>
                            <div className={cx('content-detail')}>
                                <h1 className={cx('name')}>{product.name}</h1>
                                <p className={cx('price')}>
                                    {product.stock > 0 ? `${NumberWithCommas(product.price)}đ` : 'Hết hàng'}
                                </p>
                                <p className={cx('description')}>{product.description}</p>
                                <p className={cx('note')}>{product.note}</p>
                                <div className={cx('options')}>
                                    {!_.isEmpty(options) && options.watch.length > 0 && (
                                        <ProductOption
                                            title={'Chọn đồng hồ'}
                                            options={options.watch}
                                            type={'watch'}
                                            current={optionSelected.watch}
                                            onChose={handleChoseItem}
                                        />
                                    )}
                                    {!_.isEmpty(options) && options.strap.length > 0 && (
                                        <ProductOption
                                            title={'Chọn dây đeo'}
                                            options={options.strap}
                                            type={'strap'}
                                            current={optionSelected.strap}
                                            onChose={handleChoseItem}
                                        />
                                    )}
                                </div>
                                {product.stock > 0 && (
                                    <div className={cx('buy')}>
                                        <Button onClick={handleAddToCart}>Mua ngay</Button>
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
                            <ProductByCategory title={'Sản phẩm liên quan'} listProduct={relatedProducts} column={4} />
                        </div>
                    </div>
                </main>
            )}
        </>
    );
}

export default ProductDetail;
