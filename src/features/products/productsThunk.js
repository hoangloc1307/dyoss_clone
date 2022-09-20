import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const fetchArray = [];

        fetchArray.push(
            fetch('./fake-data/products.json').then(res => res.json())
        );
        fetchArray.push(
            fetch('./fake-data/types.json').then(res => res.json())
        );
        fetchArray.push(
            fetch('./fake-data/categories.json').then(res => res.json())
        );

        const response = await Promise.all(fetchArray);

        return response;
    }
);
