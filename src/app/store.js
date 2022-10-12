import { configureStore } from '@reduxjs/toolkit';

import cartReducer from '~/features/cart';
import galleryReducer from '~/features/gallery';
import loaderReducer from '~/features/loader';
import productsReducer from '~/features/products';
import searchReducer from '~/features/search';
import userReducer from '~/features/user';

export default configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        loader: loaderReducer,
        search: searchReducer,
        gallery: galleryReducer,
        user: userReducer,
    },
});
