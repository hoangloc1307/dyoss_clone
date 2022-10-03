import { createSlice } from '@reduxjs/toolkit';

import { galleryFetchProducts, galleryFetchImageInstagram } from './galleryThunk';

const initialState = {
    instagramImages: {
        status: 'idle',
        listImage: [],
        error: '',
    },
    fetchStatus: [],
    products: [],
};

const gallerySlice = createSlice({
    name: 'gallery',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(galleryFetchProducts.pending, (state, action) => {
                const { id } = action.meta.arg;
                state.fetchStatus.push({ id, status: 'loading' });
            })
            .addCase(galleryFetchProducts.fulfilled, (state, action) => {
                const { id } = action.meta.arg;
                const idStatus = state.fetchStatus.find(item => item.id === id);
                if (idStatus) {
                    idStatus.status = 'succeeded';
                    state.products.push(...action.payload);
                }
            })
            .addCase(galleryFetchProducts.rejected, (state, action) => {
                const { id } = action.meta.arg;
                const idStatus = state.fetchStatus.find(item => item.id === id);
                if (idStatus) {
                    idStatus.status = 'failed';
                    idStatus.error = action.error.message;
                }
            })
            .addCase(galleryFetchImageInstagram.pending, (state, action) => {
                state.instagramImages.status = 'loading';
            })
            .addCase(galleryFetchImageInstagram.fulfilled, (state, action) => {
                state.instagramImages.status = 'succeeded';
                state.instagramImages.listImage.push(...action.payload);
            })
            .addCase(galleryFetchImageInstagram.rejected, (state, action) => {
                state.instagramImages.status = 'failed';
                state.instagramImages.error = action.error.message;
            });
    },
});

export default gallerySlice.reducer;
