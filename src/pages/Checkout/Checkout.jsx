import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import style from './Checkout.module.scss';
import InputNumber from '~/components/InputNumber';
import {
    removeItem,
    selectCartItems,
    selectTotalItems,
    updateCartItem,
} from '~/features/cart';
import { NumberWithCommas } from '~/functions';

const cx = classNames.bind(style);

function Checkout() {
    const dipatch = useDispatch();

    const products = useSelector(selectCartItems);
    const totalItems = useSelector(selectTotalItems);

    return (
        <main className={cx('checkout-page')}>
            <div className={cx('container')}>
                <h1 className={cx('title')}>
                    Đơn hàng của bạn ({totalItems} sản phẩm)
                </h1>
                {products.length > 0 && (
                    <ul className={cx('list-products')}>
                        {products.map(product => (
                            <li key={product.id} className={cx('product-item')}>
                                <Link
                                    to={`/product/${product.link}`}
                                    className={cx('image-box')}
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                    />
                                </Link>
                                <div className={cx('item-content')}>
                                    <Link
                                        to={`/product/${product.link}`}
                                        className={cx('name')}
                                    >
                                        {product.name}
                                    </Link>
                                    <p className={cx('price')}>
                                        Đơn giá:{' '}
                                        <span>
                                            {NumberWithCommas(product.price)}đ
                                        </span>
                                    </p>
                                    <div className={cx('amount')}>
                                        <p>SL:</p>
                                        <InputNumber
                                            value={product.total}
                                            onIncrease={() =>
                                                dipatch(
                                                    updateCartItem({
                                                        id: product.id,
                                                        type: 'increase',
                                                    })
                                                )
                                            }
                                            onDecrease={() =>
                                                dipatch(
                                                    updateCartItem({
                                                        id: product.id,
                                                        type: 'decrease',
                                                    })
                                                )
                                            }
                                        />
                                    </div>
                                    <div className={cx('total')}>
                                        Tổng cộng:{' '}
                                        <span>
                                            {NumberWithCommas(
                                                product.price * product.total
                                            )}
                                            đ
                                        </span>
                                    </div>
                                </div>
                                <div
                                    className={cx('remove')}
                                    onClick={() =>
                                        dipatch(removeItem({ id: product.id }))
                                    }
                                >
                                    Remove
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </main>
    );
}

export default Checkout;
