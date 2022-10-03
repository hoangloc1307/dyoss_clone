import { createAsyncThunk } from '@reduxjs/toolkit';

import * as http from '~/utils/http';

export const galleryFetchProducts = createAsyncThunk('gallery/fetchProducts', async payload => {
    const response = await http.get(http.Dyoss, `product/search?slug=${payload.slugString}`);
    return response;
});

export const galleryFetchImageInstagram = createAsyncThunk('gallery/fetchImages', async () => {
    const response = await http.get(
        http.Instagram,
        `me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=${process.env.REACT_APP_INSTAGRAM_KEY}`
    );
    return response.data;
});
