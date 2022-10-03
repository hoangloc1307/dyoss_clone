import { createAsyncThunk } from '@reduxjs/toolkit';

import * as http from '~/utils/http';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await http.get(http.Dyoss, 'home');
    return response;
});
