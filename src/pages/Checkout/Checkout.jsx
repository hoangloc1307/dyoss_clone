import classNames from 'classnames/bind';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import CheckoutForm from '~/components/CheckoutForm';
import InputNumber from '~/components/InputNumber';
import { removeItem, selectCartItems, selectTotalItems, updateCartItem } from '~/features/cart';
import { NumberWithCommas } from '~/functions';
import style from './Checkout.module.scss';

const cx = classNames.bind(style);

function Checkout() {
    const dipatch = useDispatch();
    const { t } = useTranslation();

    const products = useSelector(selectCartItems);
    const totalItems = useSelector(selectTotalItems);

    return (
        <main className={cx('checkout-page')}>
            <div className={cx('container')}>
                <h1 className={cx('title')}>
                    <Trans i18nKey="checkout.orderTitle">{{ totalItems }}</Trans>
                </h1>
                {products.length > 0 && (
                    <>
                        <ul className={cx('list-products')}>
                            {products.map(product => (
                                <li key={product.id} className={cx('product-item')}>
                                    <Link to={`/product/${product.link}`} className={cx('image-box')}>
                                        <img src={product.image} alt={product.name} />
                                    </Link>
                                    <div className={cx('item-content')}>
                                        <Link to={`/product/${product.link}`} className={cx('name')}>
                                            {product.name}
                                        </Link>
                                        <div className={cx('options')}>
                                            {Object.values(product.option).map((obj, index) => (
                                                <p key={index}>{obj.name}</p>
                                            ))}
                                        </div>
                                        <p className={cx('price')}>
                                            {t('checkout.unitPrice')}: <span>{NumberWithCommas(product.price)}đ</span>
                                        </p>
                                        <div className={cx('amount')}>
                                            <p>{t('checkout.quantity')}:</p>
                                            <InputNumber
                                                value={product.amount}
                                                onIncrease={() =>
                                                    dipatch(
                                                        updateCartItem({
                                                            cartId: product.cartId,
                                                            type: 'increase',
                                                        })
                                                    )
                                                }
                                                onDecrease={() =>
                                                    dipatch(
                                                        updateCartItem({
                                                            cartId: product.cartId,
                                                            type: 'decrease',
                                                        })
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className={cx('total')}>
                                            {t('checkout.total')}:{' '}
                                            <span>{NumberWithCommas(product.price * product.amount)}đ</span>
                                        </div>
                                    </div>
                                    <div
                                        className={cx('remove')}
                                        onClick={() => dipatch(removeItem({ cartId: product.cartId }))}
                                    >
                                        {t('checkout.remove')}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {/* Checkout form*/}
                        <CheckoutForm />
                    </>
                )}
            </div>
        </main>
    );
}

export default Checkout;
