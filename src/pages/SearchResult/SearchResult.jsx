import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import ProductByCategory from '~/components/ProductByCategory';
import { changeProgress } from '~/features/loader';
import * as http from '~/utils/http';
import style from './SearchResult.module.scss';

const cx = classNames.bind(style);

function SearchResult() {
    const location = useLocation();
    const dispatch = useDispatch();

    const [products, setProducts] = useState([]);
    const [displayKeyword, setDisplayKeyword] = useState('');

    const keyword = useSelector(state => state.search.keyword);
    const fetchStatus = useSelector(state => state.loader.progress);

    useEffect(() => {
        dispatch(changeProgress(50));
        let url;
        if (keyword) {
            url = `product?name=${keyword}`;
            setDisplayKeyword(keyword);
        } else {
            const searchParams = new URLSearchParams(location.search);
            url = `product?name=${searchParams.get('name')}`;
            setDisplayKeyword(searchParams.get('name'));
        }
        http.get(http.Dyoss, url).then(res => {
            setProducts(res);
            dispatch(changeProgress(100));
        });
    }, [keyword, location.search, dispatch]);

    return (
        <main className={cx('search-page')}>
            <div className={cx('container')}>
                {(fetchStatus === 0 || fetchStatus === 100) && (
                    <>
                        {products.length > 0 ? (
                            <ProductByCategory title={`Search Result: "${displayKeyword}"`} listProduct={products} />
                        ) : (
                            <h2 className={cx('not-found')}>Không tìm thấy kết quả cho "{displayKeyword}"</h2>
                        )}
                    </>
                )}
            </div>
        </main>
    );
}

export default SearchResult;
