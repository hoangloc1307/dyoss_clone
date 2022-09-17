import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import products from '~/assets/datas/products';

const initialState = {
    productList: [],
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
                state.productList = state.productList.concat(action.payload);
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default productsSlice.reducer;

//Thunks
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await new Promise((resolve, reject) => {
            setTimeout(() => resolve(products), 2000);
        });

        return response;
    },
);

//Selector
export const selectAllProducts = (state) => state.products.productList;
