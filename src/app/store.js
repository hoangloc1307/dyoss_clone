import { configureStore } from '@reduxjs/toolkit';

import cartReducer from '~/features/cart';
import productsReducer from '~/features/products';
import loaderReducer from '~/features/loader';
import searchReducer from '~/features/search';

export default configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        loader: loaderReducer,
        search: searchReducer,
    },
});
