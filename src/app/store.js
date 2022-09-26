import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '~/features/cart';
import productsReducer from '~/features/products';

export default configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
    },
});
