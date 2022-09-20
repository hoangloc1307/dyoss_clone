import { configureStore } from '@reduxjs/toolkit';
import cartSlice from '~/features/cart/cartSlice';
import productsReducer from '~/features/products';

export default configureStore({
    reducer: {
        products: productsReducer,
        cart: cartSlice,
    },
});
