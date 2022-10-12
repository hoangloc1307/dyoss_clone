import classNames from 'classnames/bind';

import style from './Dashboard.module.scss';

const cx = classNames.bind(style);

function Dashboard() {
    return <h1 className={cx('')}>Admin page</h1>;
}

export default Dashboard;
