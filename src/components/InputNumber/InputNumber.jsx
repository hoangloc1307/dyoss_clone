import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import style from './InputNumber.module.scss';

const cx = classNames.bind(style);

function InputNumber({ value, onIncrease, onDecrease }) {
    return (
        <div className={cx('input-number')}>
            <div className={cx('input')}>
                <span>{value}</span>
            </div>
            <div className={cx('buttons')}>
                <span className={cx('decrease')} onClick={() => onDecrease()}>
                    <FontAwesomeIcon icon={faMinus} />
                </span>
                <span className={cx('increase')} onClick={() => onIncrease()}>
                    <FontAwesomeIcon icon={faPlus} />
                </span>
            </div>
        </div>
    );
}

export default InputNumber;
