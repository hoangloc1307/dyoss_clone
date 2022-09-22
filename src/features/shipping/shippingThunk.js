import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProvinces = createAsyncThunk(
    'shipping/fetchProvinces',
    async () => {
        const response = await fetch(
            'https://online-gateway.ghn.vn/shiip/public-api/master-data/province',
            {
                method: 'post',
                headers: {
                    token: '221a29d9-3a3e-11ed-8008-c673db1cbf27',
                },
            }
        );

        const responseJSON = await response.json();

        return responseJSON.data;
    }
);
