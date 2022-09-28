import { createSlice } from '@reduxjs/toolkit';

import { fetchProducts } from './productsThunk';

const initialState = {
    sellingProducts: [],
    manProducts: [],
    womanProducts: [],
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
                state.sellingProducts = action.payload[0];
                state.manProducts = action.payload[1];
                state.womanProducts = action.payload[2];
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default productsSlice.reducer;
