import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';

import { changeProgress } from '~/features/loader';

function TopLoading() {
    const dispatch = useDispatch();

    const progress = useSelector(state => state.loader.progress);

    return (
        <LoadingBar
            color={
                'linear-gradient(90deg, #f00 0%, #ff9a00 10%, #d0de21 20%, #4fdc4a 30%, #3fdad8 40%, #2fc9e2 50%, #1c7fee 60%, #5f15f2 70%, #ba0cf8 80%, #fb07d9 90%, #f00 100%)'
            }
            progress={progress}
            onLoaderFinished={() => dispatch(changeProgress(0))}
        />
    );
}

export default memo(TopLoading);
