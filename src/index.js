import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from '~/App';
import store from '~/app/store';
import GlobalStyles from '~/components/GlobalStyles';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <GlobalStyles>
            <App />
        </GlobalStyles>
    </Provider>
);
