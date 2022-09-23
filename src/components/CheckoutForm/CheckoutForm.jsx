import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';

import style from './CheckoutForm.module.scss';
import Button from '~/components/Button';
import * as http from '~/utils/http';
import { IsValidPhone, NumberWithCommas } from '~/functions';
import { selectTotalPrice, selectCartItems } from '~/features/cart';

const cx = classNames.bind(style);

function CheckoutForm() {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [shippingPrice, setShippingPrice] = useState(0);

    const price = useSelector(selectTotalPrice);
    const products = useSelector(selectCartItems);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            address: '',
            provinceID: '',
            province: '',
            districtID: '',
            district: '',
            wardCode: '',
            ward: '',
            note: '',
        },
        // validationSchema: Yup.object({
        //     name: Yup.string().required('Vui lòng nhập tên!'),
        //     email: Yup.string()
        //         .email('Email không hợp lệ!')
        //         .required('Vui lòng nhập email!'),
        //     address: Yup.string().required('Vui lòng nhập địa chỉ!'),
        //     province: Yup.string().required('Vui lòng chọn tỉnh/thành phố!'),
        //     district: Yup.string().required('Vui lòng chọn quận/huyện!'),
        //     ward: Yup.string().required('Vui lòng chọn xã/phường!'),
        //     note: Yup.string().nullable(),
        // }),
        // validate: customValidate,
        validateOnChange: false,
        validateOnBlur: true,
        onSubmit: values => {
            console.log(values);
        },
    });

    //Lấy data tỉnh
    useEffect(() => {
        http.get('master-data/province').then(res =>
            setProvinces(
                res.data.sort((prev, next) =>
                    prev.ProvinceName.localeCompare(next.ProvinceName)
                )
            )
        );
    }, []);

    //Tính phí vận chuyển
    useEffect(() => {
        if (formik.values.wardCode !== '') {
            http.post('v2/shipping-order/fee', {
                shop_id: 3281000,
                service_type_id: 2,
                insurance_value: 0,
                coupon: '',
                from_district_id: 1536,
                to_district_id: parseInt(formik.values.districtID),
                to_ward_code: formik.values.wardCode,
                weight: 500,
                length: 20,
                width: 4,
                height: 1,
            }).then(res => setShippingPrice(res.data.total));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [price, formik.values.wardCode]);

    const handleChangeProvince = e => {
        formik.setFieldValue('province', e.target[e.target.selectedIndex].text);
        formik.setFieldValue('provinceID', e.target.value);

        http.post('master-data/district', {
            province_id: parseInt(e.target.value),
        }).then(res => {
            setDistricts(
                res.data.sort((prev, next) =>
                    prev.DistrictName.localeCompare(next.DistrictName)
                )
            );

            setWards([]);
        });
    };

    const handleChangeDistrict = e => {
        formik.setFieldValue('district', e.target[e.target.selectedIndex].text);
        formik.setFieldValue('districtID', e.target.value);

        http.post('master-data/ward', {
            district_id: parseInt(e.target.value),
        }).then(res =>
            setWards(
                res.data.sort((prev, next) =>
                    prev.WardName.localeCompare(next.WardName)
                )
            )
        );
    };

    const handleChangeWard = e => {
        formik.setFieldValue('ward', e.target[e.target.selectedIndex].text);
        formik.setFieldValue('wardCode', e.target.value);
    };

    function customValidate(values) {
        const errors = {};

        //Phone
        if (!values.phone) {
            errors.phone = 'Vui lòng nhập số điện thoại!';
        } else if (!IsValidPhone(values.phone)) {
            errors.phone = 'Số điện thoại không hợp lệ!';
        }

        //Name
        // if (!values.name) {
        //     errors.name = 'Vui lòng nhập họ tên!';
        // } else if (!IsValidName(values.name)) {
        //     errors.name = 'Họ tên không hợp lệ!';
        // }

        return errors;
    }

    return (
        <form
            className={cx('checkout-form')}
            spellCheck="false"
            onSubmit={formik.handleSubmit}
        >
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
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="name">Họ và tên</label>
                    {formik.touched.name && formik.errors.name && (
                        <span className={cx('form-error')}>
                            {formik.errors.name}
                        </span>
                    )}
                </div>
                <div className={cx('email-field', 'input-field')}>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="."
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="email">Email</label>
                    {formik.touched.email && formik.errors.email && (
                        <span className={cx('form-error')}>
                            {formik.errors.email}
                        </span>
                    )}
                </div>
                <div className={cx('phone-field', 'input-field')}>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="."
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="phone">Điện thoại</label>
                    {formik.touched.phone && formik.errors.phone && (
                        <span className={cx('form-error')}>
                            {formik.errors.phone}
                        </span>
                    )}
                </div>
                <div className={cx('address-field', 'input-field')}>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder="."
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="address">Địa chỉ</label>
                    {formik.touched.address && formik.errors.address && (
                        <span className={cx('form-error')}>
                            {formik.errors.address}
                        </span>
                    )}
                </div>
                <div className={cx('address-select')}>
                    <div className={cx('select')}>
                        <select
                            name="province"
                            id="province"
                            value={formik.values.provinceID}
                            onChange={e => handleChangeProvince(e)}
                            onBlur={formik.handleBlur}
                        >
                            <option value="">Chọn Tỉnh/Thành phố</option>
                            {provinces.length > 0 &&
                                provinces.map(province => (
                                    <option
                                        key={province.ProvinceID}
                                        value={province.ProvinceID}
                                    >
                                        {province.ProvinceName}
                                    </option>
                                ))}
                        </select>
                        {formik.touched.province && formik.errors.province && (
                            <span className={cx('form-error')}>
                                {formik.errors.province}
                            </span>
                        )}
                    </div>
                    <div className={cx('select')}>
                        <select
                            name="district"
                            id="district"
                            value={formik.values.districtID}
                            onChange={e => handleChangeDistrict(e)}
                            onBlur={formik.handleBlur}
                        >
                            <option value="">Chọn Quận/Huyện</option>
                            {districts.length > 0 &&
                                districts.map(district => (
                                    <option
                                        key={district.DistrictID}
                                        value={district.DistrictID}
                                    >
                                        {district.DistrictName}
                                    </option>
                                ))}
                        </select>
                        {formik.touched.district && formik.errors.district && (
                            <span className={cx('form-error')}>
                                {formik.errors.district}
                            </span>
                        )}
                    </div>
                    <div className={cx('select')}>
                        <select
                            name="ward"
                            id="ward"
                            value={formik.values.wardCode}
                            onChange={e => handleChangeWard(e)}
                            onBlur={formik.handleBlur}
                        >
                            <option value="">Chọn Phường/Xã</option>
                            {wards.length > 0 &&
                                wards.map(ward => (
                                    <option
                                        key={ward.WardCode}
                                        value={ward.WardCode}
                                    >
                                        {ward.WardName}
                                    </option>
                                ))}
                        </select>
                        {formik.touched.ward && formik.errors.ward && (
                            <span className={cx('form-error')}>
                                {formik.errors.ward}
                            </span>
                        )}
                    </div>
                </div>
                <div className={cx('note-field', 'input-field')}>
                    <textarea
                        id="note"
                        name="note"
                        placeholder="."
                        value={formik.values.note}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    ></textarea>
                    <label htmlFor="note">Ghi chú</label>
                    {formik.touched.note && formik.errors.note && (
                        <span className={cx('form-error')}>
                            {formik.errors.note}
                        </span>
                    )}
                </div>
            </div>
            <div className={cx('total')}>
                <h2 className={cx('title')}>Thanh toán</h2>
                <div className={cx('detail-price')}>
                    <div className={cx('price')}>
                        <span>Đơn hàng</span>
                        <span>{NumberWithCommas(price)}đ</span>
                    </div>
                    <div className={cx('price')}>
                        <span>Phí giao</span>
                        <span>{NumberWithCommas(shippingPrice)}đ</span>
                    </div>
                </div>
                <div className={cx('total-price')}>
                    <span>Tổng cộng</span>
                    <span>{NumberWithCommas(price + shippingPrice)}đ</span>
                </div>
            </div>
            <Button type="submit" customClass={style}>
                Đặt hàng
            </Button>
        </form>
    );
}

export default CheckoutForm;
