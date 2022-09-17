import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '~/features/products/productsSlice';

export default configureStore({
    reducer: {
        products: productsReducer,
    },
});
