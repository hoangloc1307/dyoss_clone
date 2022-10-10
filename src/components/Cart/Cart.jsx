import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import Button from '~/components/Button';
import InputNumber from '~/components/InputNumber';
import {
    changeStatus,
    removeItem,
    selectCartItems,
    selectShowStatus,
    selectTotalItems,
    selectTotalPrice,
    updateCartItem,
} from '~/features/cart';
import { NumberWithCommas } from '~/functions';
import style from './Cart.module.scss';

const cx = classNames.bind(style);

function Cart({ customClass }) {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const location = useLocation();

    const products = useSelector(selectCartItems);
    const totalItem = useSelector(selectTotalItems);
    const totalPrice = useSelector(selectTotalPrice);
    const showStatus = useSelector(selectShowStatus);

    useEffect(() => {
        if (showStatus === true) {
            dispatch(changeStatus({ status: false }));
        }
        // eslint-disable-next-line
    }, [dispatch, location.pathname]);

    return (
        <div className={cx('cart')}>
            <div
                className={cx('cart-icon', customClass?.['cart-icon'])}
                onClick={() => dispatch(changeStatus({ status: 'auto' }))}
            >
                <div className={cx('cart-amount', customClass?.['cart-amount'])}>{totalItem}</div>
            </div>

            {showStatus && (
                <>
                    <span className={cx('cart-arrow', customClass?.['cart-arrow'])}>
                        <FontAwesomeIcon icon={faCaretDown} />
                    </span>
                    <div className={cx('cart-detail', customClass?.['cart-detail'])}>
                        {products.length > 0 ? (
                            <ul className={cx('cart-items')}>
                                {products.map(item => (
                                    <li key={item.id} className={cx('cart-item')}>
                                        <div className={cx('item-contain')}>
                                            <Link to={`/product/${item.link}`} className={cx('image-box')}>
                                                <img src={item.image} alt={item.name} />
                                            </Link>
                                            <div className={cx('item-detail')}>
                                                <Link to={`/product/${item.link}`} className={cx('name')}>
                                                    {item.name}
                                                </Link>
                                                <p className={cx('price')}>{NumberWithCommas(item.price)}đ</p>
                                                <div className={cx('amount')}>
                                                    <span>SL:</span>
                                                    <InputNumber
                                                        value={item.amount}
                                                        onIncrease={() =>
                                                            dispatch(
                                                                updateCartItem({
                                                                    cartId: item.cartId,
                                                                    type: 'increase',
                                                                })
                                                            )
                                                        }
                                                        onDecrease={() =>
                                                            dispatch(
                                                                updateCartItem({
                                                                    cartId: item.cartId,
                                                                    type: 'decrease',
                                                                })
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <FontAwesomeIcon
                                                icon={faCircleXmark}
                                                className={cx('remove')}
                                                onClick={() => {
                                                    dispatch(
                                                        removeItem({
                                                            cartId: item.cartId,
                                                        })
                                                    );
                                                }}
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className={cx('empty')}>{t('cart.noItem')}</p>
                        )}

                        <div className={cx('total')}>{`${t('cart.total')}: ${NumberWithCommas(totalPrice)}đ`}</div>
                        <Button to={'/checkout'} customClass={style}>
                            {t('cart.checkout')}
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;
