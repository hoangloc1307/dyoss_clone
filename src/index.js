import React from 'react';
import ReactDOM from 'react-dom/client';

import GlobalStyles from '~/components/GlobalStyles';
import App from '~/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalStyles>
            <App />
        </GlobalStyles>
    </React.StrictMode>,
);
