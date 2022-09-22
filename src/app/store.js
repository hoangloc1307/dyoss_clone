import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '~/features/cart';
import productsReducer from '~/features/products';
import shippingReducer from '~/features/shipping';

export default configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        shipping: shippingReducer,
    },
});
