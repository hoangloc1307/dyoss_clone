import { createSlice } from '@reduxjs/toolkit';

import { fetchProducts } from './productsThunk';

const initialState = {
    productList: [],
    productType: [],
    productCategory: [],
    status: 'idle',
    error: null,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.productList = state.productList.concat(
                    action.payload[0].products
                );
                state.productType = state.productType.concat(
                    action.payload[1].types
                );
                state.productCategory = state.productCategory.concat(
                    action.payload[2].categories
                );
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default productsSlice.reducer;
