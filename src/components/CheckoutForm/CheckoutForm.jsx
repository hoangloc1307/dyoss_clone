import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

import Button from '~/components/Button';
import InputField from '~/components/InputField';
import { selectCartItems, selectTotalPrice } from '~/features/cart';
import { IsValidPhone, NumberWithCommas } from '~/functions';
import * as http from '~/utils/http';
import style from './CheckoutForm.module.scss';

const cx = classNames.bind(style);

function CheckoutForm() {
    const { t } = useTranslation();

    //State
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [shippingPrice, setShippingPrice] = useState(0);

    //Selector
    const price = useSelector(selectTotalPrice);
    const products = useSelector(selectCartItems);

    //Formik
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
        validationSchema: Yup.object({
            name: Yup.string().required('checkout.requiredName'),
            email: Yup.string().email('checkout.invalidEmail').required('checkout.requiredEmail'),
            address: Yup.string().required('checkout.requiredAddress'),
            provinceID: Yup.string().required('checkout.selectCity'),
            note: Yup.string().nullable(),
        }),
        validate: customValidate,
        validateOnChange: false,
        validateOnBlur: true,
        validateOnMount: true,
        onSubmit: values => {
            values.products = products.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price,
                amount: product.amount,
                option: product.option,
            }));
            values.itemsPrice = price;
            values.shippingPrice = shippingPrice;
            console.log(values);
            alert('Đã ghi thông tin trong console.');
        },
    });

    function customValidate(values) {
        const errors = {};

        //Phone
        if (!values.phone) {
            errors.phone = 'checkout.requiredPhone';
        } else if (!IsValidPhone(values.phone)) {
            errors.phone = 'checkout.invalidPhone';
        }

        //District
        if (!values.districtID) {
            if (!values.provinceID) {
                errors.districtID = t('checkout.selectCityFirst');
            } else {
                errors.districtID = t('checkout.selectDistrict');
            }
        }

        //Ward
        if (!values.wardCode) {
            if (!values.districtID) {
                errors.wardCode = t('checkout.selectDistrictFirst');
            } else {
                errors.wardCode = t('checkout.selectWard');
            }
        }
        return errors;
    }

    //Lấy data tỉnh
    useEffect(() => {
        http.get(http.GHN, 'master-data/province').then(res =>
            setProvinces(res.data.sort((prev, next) => prev.ProvinceName.localeCompare(next.ProvinceName)))
        );
    }, []);

    //Tính phí vận chuyển
    useEffect(() => {
        if (formik.values.wardCode !== '') {
            http.post(http.GHN, 'v2/shipping-order/fee', {
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

        http.post(http.GHN, 'master-data/district', {
            province_id: parseInt(e.target.value),
        }).then(res => {
            setDistricts(res.data.sort((prev, next) => prev.DistrictName.localeCompare(next.DistrictName)));

            setWards([]);

            formik.setFieldValue('districtID', '');
            formik.setFieldValue('wardCode', '');
        });
    };

    const handleChangeDistrict = e => {
        formik.setFieldValue('district', e.target[e.target.selectedIndex].text);
        formik.setFieldValue('districtID', e.target.value);

        http.post(http.GHN, 'master-data/ward', {
            district_id: parseInt(e.target.value),
        }).then(res => setWards(res.data.sort((prev, next) => prev.WardName.localeCompare(next.WardName))));
    };

    const handleChangeWard = e => {
        formik.setFieldValue('ward', e.target[e.target.selectedIndex].text);
        formik.setFieldValue('wardCode', e.target.value);
    };

    const handleSubmitError = () => {
        const errorKeys = Object.keys(formik.errors);
        if (errorKeys.length > 0) {
            document.getElementsByName(errorKeys[0])[0].focus();
        }
    };

    return (
        <form
            className={cx('checkout-form')}
            spellCheck="false"
            onSubmit={e => {
                return (() => {
                    formik.handleSubmit(e);
                    handleSubmitError();
                })();
            }}
        >
            <div className={cx('contact')}>
                <h2 className={cx('title')}>{t('checkout.contactInfo')}</h2>
                <InputField
                    type="text"
                    id="name"
                    name="name"
                    placeholder="."
                    value={formik.values.name}
                    label={t('checkout.name')}
                    require
                    touched={formik.touched.name}
                    error={formik.errors.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <InputField
                    type="text"
                    id="email"
                    name="email"
                    placeholder="."
                    value={formik.values.email}
                    label="Email"
                    require
                    touched={formik.touched.email}
                    error={formik.errors.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <InputField
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="."
                    value={formik.values.phone}
                    label={t('checkout.phone')}
                    require
                    touched={formik.touched.phone}
                    error={formik.errors.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <InputField
                    type="text"
                    id="address"
                    name="address"
                    placeholder="."
                    value={formik.values.address}
                    label={t('checkout.address')}
                    require
                    touched={formik.touched.address}
                    error={formik.errors.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <div className={cx('address-select')}>
                    <div className={cx('select')}>
                        <select
                            name="provinceID"
                            id="province"
                            value={formik.values.provinceID}
                            className={cx({
                                pristine: !formik.values.provinceID,
                            })}
                            onChange={e => handleChangeProvince(e)}
                            onBlur={formik.handleBlur}
                        >
                            <option value="">{t('checkout.selectCityOption')} *</option>
                            {provinces.length > 0 &&
                                provinces.map(province => (
                                    <option key={province.ProvinceID} value={province.ProvinceID}>
                                        {province.ProvinceName}
                                    </option>
                                ))}
                        </select>
                        {formik.touched.provinceID && formik.errors.provinceID && (
                            <span className={cx('form-error')}>{t(formik.errors.provinceID)}</span>
                        )}
                    </div>
                    <div className={cx('select')}>
                        <select
                            name="districtID"
                            id="district"
                            value={formik.values.districtID}
                            className={cx({
                                pristine: !formik.values.districtID,
                            })}
                            onChange={e => handleChangeDistrict(e)}
                            onBlur={formik.handleBlur}
                        >
                            <option value="">{t('checkout.selectDistrictOption')} *</option>
                            {districts.length > 0 &&
                                districts.map(district => (
                                    <option key={district.DistrictID} value={district.DistrictID}>
                                        {district.DistrictName}
                                    </option>
                                ))}
                        </select>
                        {formik.touched.districtID && formik.errors.districtID && (
                            <span className={cx('form-error')}>{formik.errors.districtID}</span>
                        )}
                    </div>
                    <div className={cx('select')}>
                        <select
                            name="wardCode"
                            id="ward"
                            value={formik.values.wardCode}
                            className={cx({
                                pristine: !formik.values.wardCode,
                            })}
                            onChange={e => handleChangeWard(e)}
                            onBlur={formik.handleBlur}
                        >
                            <option value="">{t('checkout.selectWardOption')} *</option>
                            {wards.length > 0 &&
                                wards.map(ward => (
                                    <option key={ward.WardCode} value={ward.WardCode}>
                                        {ward.WardName}
                                    </option>
                                ))}
                        </select>
                        {formik.touched.wardCode && formik.errors.wardCode && (
                            <span className={cx('form-error')}>{formik.errors.wardCode}</span>
                        )}
                    </div>
                </div>
                <InputField
                    type="textarea"
                    id="note"
                    name="note"
                    placeholder="."
                    value={formik.values.note}
                    label={t('checkout.note')}
                    touched={formik.touched.note}
                    error={formik.errors.note}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            </div>
            <div className={cx('total')}>
                <h2 className={cx('title')}>{t('checkout.checkout')}</h2>
                <div className={cx('detail-price')}>
                    <div className={cx('price')}>
                        <span>{t('checkout.itemsPrice')}</span>
                        <span>{NumberWithCommas(price)}đ</span>
                    </div>
                    <div className={cx('price')}>
                        <span>{t('checkout.shippingPrice')}</span>
                        <span>{NumberWithCommas(shippingPrice)}đ</span>
                    </div>
                </div>
                <div className={cx('total-price')}>
                    <span>{t('checkout.total')}</span>
                    <span>{NumberWithCommas(price + shippingPrice)}đ</span>
                </div>
            </div>
            <Button type="submit" customClass={style}>
                {t('button.order')}
            </Button>
        </form>
    );
}

export default CheckoutForm;
