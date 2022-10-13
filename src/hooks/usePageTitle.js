import { useTranslation } from 'react-i18next';

import { useEffect } from 'react';

function usePageTitle(title = '', dependencies = []) {
    const { t } = useTranslation();
    useEffect(() => {
        document.title = title ? `${title} | ${process.env.REACT_APP_APP_NAME}` : process.env.REACT_APP_APP_NAME;
        //eslint-disable-next-line
    }, [t, ...dependencies]);
}

export default usePageTitle;
