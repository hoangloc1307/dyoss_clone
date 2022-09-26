import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import english from '~/assets/langs/en.json';

const resources = {
    en: english,
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
