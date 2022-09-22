import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';

import style from './CheckoutForm.module.scss';
import Button from '~/components/Button';
import * as http from '~/utils/http';

const cx = classNames.bind(style);

function CheckoutForm() {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            address: '',
            province: '',
            district: '',
            village: '',
            note: '',
        },
        onSubmit: values => {
            console.log(values);
        },
    });

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    useEffect(() => {
        http.get('province').then(res => console.log(res));
    }, []);

    return (
        <form onSubmit={formik.handleSubmit} className={cx('checkout-form')}>
            <div className={cx('contact')}>
                <h2 className={cx('title')}>Thông tin cá nhân</h2>
                <div className={cx('name-field', 'input-field')}>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="."
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                    <label htmlFor="name">Họ và tên</label>
                </div>
                <div className={cx('email-field', 'input-field')}>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="."
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    <label htmlFor="email">Email</label>
                </div>
                <div className={cx('phone-field', 'input-field')}>
                    <input
                        type="phone"
                        id="phone"
                        name="phone"
                        placeholder="."
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                    />
                    <label htmlFor="phone">Điện thoại</label>
                </div>
                <div className={cx('address-field', 'input-field')}>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder="."
                        value={formik.values.address}
                        onChange={formik.handleChange}
                    />
                    <label htmlFor="address">Địa chỉ</label>
                </div>
                <div className={cx('address-select')}>
                    <select
                        name="province"
                        id="province"
                        value={formik.values.province}
                        onChange={e => {
                            formik.setFieldValue('province', e.target.value);
                            console.log(e.target.value);
                        }}
                    >
                        <option value="">Chọn Tỉnh/Thành phố</option>
                    </select>
                    <select
                        name="district"
                        id="district"
                        value={formik.values.district}
                        onChange={formik.handleChange}
                    >
                        <option value="">Chọn Quận/Huyện</option>
                        <option value="222">Nhơn Trạch</option>
                    </select>
                    <select
                        name="village"
                        id="village"
                        value={formik.values.village}
                        onChange={formik.handleChange}
                    >
                        <option value="">Chọn Phường/Xã</option>
                        <option value="333">Phước An</option>
                    </select>
                </div>
                <div className={cx('note-field', 'input-field')}>
                    <textarea
                        id="note"
                        name="note"
                        placeholder="."
                        value={formik.values.note}
                        onChange={formik.handleChange}
                    ></textarea>
                    <label htmlFor="note">Ghi chú</label>
                </div>
            </div>
            <div className={cx('total')}>
                <h2 className={cx('title')}>Thanh toán</h2>
                <div className={cx('detail-price')}>
                    <div className={cx('price')}>
                        <span>Đơn hàng</span>
                        <span>99,300,000đ</span>
                    </div>
                    <div className={cx('price')}>
                        <span>Phí giao</span>
                        <span>0đ</span>
                    </div>
                </div>
                <div className={cx('total-price')}>
                    <span>Tổng cộng</span>
                    <span>99,300,000đ</span>
                </div>
            </div>
            <Button type="submit" customClass={style}>
                Đặt hàng
            </Button>
        </form>
    );
}

export default CheckoutForm;
