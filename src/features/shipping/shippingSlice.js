import { createSlice } from '@reduxjs/toolkit';

import { fetchProvinces } from './shippingThunk';

const initialState = {
    provinces: [],
    status: 'idle',
};

const shippingSlice = createSlice({
    name: 'shipping',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchProvinces.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchProvinces.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.provinces = state.provinces.concat(action.payload);
            })
            .addCase(fetchProvinces.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default shippingSlice.reducer;
