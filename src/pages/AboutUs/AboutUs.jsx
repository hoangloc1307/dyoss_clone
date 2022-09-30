import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';

import style from './AboutUs.module.scss';
import images from '~/assets/images';
import TopLoading from '~/components/TopLoading';
import { changeProgress } from '~/features/loader';

const cx = classNames.bind(style);

function AboutUs() {
    const dispatch = useDispatch();
    dispatch(changeProgress(100));
    return (
        <main className={cx('about-us')}>
            <TopLoading />
            <div className={cx('container')}>
                <div className={cx('inner')}>
                    <div className={cx('block')}>
                        <h2 className={cx('title')}>Giới thiệu</h2>
                        <p>
                            Với phương châm “không bao giờ nhìn lại”, sản phẩm
                            sau chỉ có thể tốt hơn sản phẩm trước - những mẫu
                            đồng hồ này là tuyệt tác mới nhất của Dyoss. Một
                            thiết kế sang trọng, tinh giản, hiện đại, có thể
                            phối với bất kì gu thời trang nào, cùng với độ bền
                            của sản phẩm cực cao.
                        </p>
                        <img
                            src="https://www.dyoss.com/app/uploads/2017/07/dyoss-high.gif"
                            alt="anti water"
                            className={cx('image')}
                        />
                        <h2 className={cx('title')}>Nét nổi bật</h2>
                        <p>
                            Có một điều mà Dyoss chắc chắn: Những chiếc đồng hồ
                            do chúng tôi làm ra không đơn thuần chỉ là những
                            công cụ xem giờ - chúng là những biểu vật có cá
                            tính, là cộng sự đáng tin cậy của bạn qua mỗi tích
                            tắc thời gian.
                        </p>
                    </div>
                    <div className={cx('block')}>
                        <img
                            src={images.feature1}
                            alt="Chống trầy"
                            className={cx('icon')}
                        />
                        <h2 className={cx('title')}>
                            Kính Sapphire chống trầy
                        </h2>
                        <p>
                            Là loại kính có độ bền cao, chống xước tuyệt đối,
                            thường được sử dụng trong các thương hiệu cao cấp.
                        </p>
                    </div>
                    <div className={cx('block')}>
                        <img
                            src={images.feature2}
                            alt="Chống nước"
                            className={cx('icon')}
                        />
                        <h2 className={cx('title')}>Chống nước 5ATM</h2>
                        <p>
                            Gia công lắp ráp hoàn hảo, giúp bảo vệ đồng hồ một
                            cách tối ưu, chịu được áp lực nước ở cấp độ 5ATM.
                        </p>
                    </div>
                    <div className={cx('block')}>
                        <img
                            src={images.feature3}
                            alt="Máy nhật"
                            className={cx('icon')}
                        />
                        <h2 className={cx('title')}>Máy Miyota Nhật bản</h2>
                        <p>
                            Cỗ máy kiểm soát thời gian hoạt động mạnh mẽ và
                            chính xác, thương hiệu nổi danh trên toàn thế giới.
                        </p>
                    </div>
                    <div className={cx('block')}>
                        <h2 className={cx('title')}>Bắt kịp xu hướng</h2>
                        <p>
                            Hãy là một trong những người đầu tiên chạm tay vào
                            Dyoss Watch, mẫu đồng hồ đeo tay mới nhất đánh dấu
                            sự trở lại của Dyoss. Sản phẩm được tái thiết hoàn
                            toàn so với “đàn anh” của mình sẽ là phụ kiện không
                            thể thiếu trong cuộc sống hiện đại của bạn.
                        </p>
                        <img
                            src="https://www.dyoss.com/app/uploads/2017/05/About_couple1240x744.jpg"
                            alt="Bắt kịp xu hướng"
                            className={cx('image')}
                        />
                        <p>
                            Dyoss Watch là thành quả của một quá trình tận lực
                            làm việc của chúng tôi. Và Dyoss vẫn sẽ không ngừng
                            cố gắng để tiếp tục tạo ra nhiều sản phẩm đồng hồ có
                            sức lôi cuốn trên diện rộng hơn nữa.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default AboutUs;
