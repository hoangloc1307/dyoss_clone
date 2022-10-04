import classNames from 'classnames/bind';

import style from './AboutUs.module.scss';
import images from '~/assets/images';
import { useEffect, useState } from 'react';
import i18n from '~/i18n';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(style);

function AboutUs() {
    const { t } = useTranslation();
    const [lang, setLang] = useState();

    useEffect(() => {
        setLang(i18n.language);
    }, [t]);

    return (
        <main className={cx('about-us')}>
            <div className={cx('container')}>
                <div className={cx('inner')}>
                    <div className={cx('block')}>
                        <h2 className={cx('title')}>{lang === 'vi' ? 'Giới thiệu' : 'Introduce'}</h2>
                        <p>
                            {lang === 'vi'
                                ? `Với phương châm “không bao giờ nhìn lại”, sản phẩm sau chỉ có thể tốt hơn sản phẩm trước -
                            những mẫu đồng hồ này là tuyệt tác mới nhất của Dyoss. Một thiết kế sang trọng, tinh giản,
                            hiện đại, có thể phối với bất kì gu thời trang nào, cùng với độ bền của sản phẩm cực cao.`
                                : `With the motto "never looking back", the latter can only be better than the former - 
                                these models are Dyoss' latest masterpiece. A luxurious, streamlined, 
                                modern design that can be combined with any fashion sense, along with the extremely high 
                                durability of the product.`}
                        </p>
                        <img
                            src="https://www.dyoss.com/app/uploads/2017/07/dyoss-high.gif"
                            alt="anti water"
                            className={cx('image')}
                        />
                        <h2 className={cx('title')}>{lang === 'vi' ? 'Nét nổi bật' : 'Highlights'}</h2>
                        <p>
                            {lang === 'vi'
                                ? `Có một điều mà Dyoss chắc chắn: Những chiếc đồng hồ do chúng tôi làm ra không đơn thuần chỉ
                            là những công cụ xem giờ - chúng là những biểu vật có cá tính, là cộng sự đáng tin cậy của
                            bạn qua mỗi tích tắc thời gian.`
                                : `One thing Dyoss is sure of: The watches we make are more than just tools to tell the time - 
                                they are symbols of personality, your trusted partner in every tick of time.`}
                        </p>
                    </div>
                    <div className={cx('block')}>
                        <img src={images.feature1} alt="Chống trầy" className={cx('icon')} />
                        <h2 className={cx('title')}>
                            {lang === 'vi' ? `Kính Sapphire chống trầy` : `Scratch resistant Sapphire glass`}
                        </h2>
                        <p>
                            {lang === 'vi'
                                ? `Là loại kính có độ bền cao, chống xước tuyệt đối, thường được sử dụng trong các thương hiệu cao cấp.`
                                : `Is a type of glass with high strength, absolute scratch resistance, often used in high-end brands.`}
                        </p>
                    </div>
                    <div className={cx('block')}>
                        <img src={images.feature2} alt="Chống nước" className={cx('icon')} />
                        <h2 className={cx('title')}>{lang === 'vi' ? `Chống nước 5ATM` : `Water resistant 5ATM`}</h2>
                        <p>
                            {lang === 'vi'
                                ? `Gia công lắp ráp hoàn hảo, giúp bảo vệ đồng hồ một cách tối ưu, chịu được áp lực nước ở cấp độ 5ATM.`
                                : `Perfectly assembled, providing optimal protection for the watch, withstanding 5ATM water pressure.`}
                        </p>
                    </div>
                    <div className={cx('block')}>
                        <img src={images.feature3} alt="Máy nhật" className={cx('icon')} />
                        <h2 className={cx('title')}>
                            {lang === 'vi' ? `Máy Miyota Nhật Bản` : `Japan Miyota Machine`}
                        </h2>
                        <p>
                            {lang === 'vi'
                                ? `Cỗ máy kiểm soát thời gian hoạt động mạnh mẽ và chính xác, thương hiệu nổi danh trên toàn thế giới.`
                                : `Powerful and precise time control movement, famous brand all over the world.`}
                        </p>
                    </div>
                    <div className={cx('block')}>
                        <h2 className={cx('title')}>{lang === 'vi' ? `Bắt kịp xu hướng` : `Follow the trend`}</h2>
                        <p>
                            {lang === 'vi'
                                ? `Hãy là một trong những người đầu tiên chạm tay vào Dyoss Watch, mẫu đồng hồ đeo tay mới nhất
                            đánh dấu sự trở lại của Dyoss. Sản phẩm được tái thiết hoàn toàn so với “đàn anh” của mình
                            sẽ là phụ kiện không thể thiếu trong cuộc sống hiện đại của bạn.`
                                : `Be one of the first to get your hands on the Dyoss Watch, the latest wristwatch that marks the 
                                return of Dyoss. The product is completely redesigned compared to its "elder" will be an indispensable 
                                accessory in your modern life.`}
                        </p>
                        <img
                            src="https://www.dyoss.com/app/uploads/2017/05/About_couple1240x744.jpg"
                            alt="Bắt kịp xu hướng"
                            className={cx('image')}
                        />
                        <p>
                            {lang === 'vi'
                                ? `Dyoss Watch là thành quả của một quá trình tận lực làm việc của chúng tôi. Và Dyoss vẫn sẽ
                            không ngừng cố gắng để tiếp tục tạo ra nhiều sản phẩm đồng hồ có sức lôi cuốn trên diện rộng
                            hơn nữa.`
                                : `Dyoss Watch is the result of our hard work. And Dyoss will continue to strive to create 
                                more and more universally appealing timepieces.`}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default AboutUs;
