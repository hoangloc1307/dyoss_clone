import { createSlice } from '@reduxjs/toolkit';

const initialState = { status: false };

const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        changeState: (state, action) => {
            state.status = action.payload;
        },
    },
});

export const { changeState } = loaderSlice.actions;

export default loaderSlice.reducer;
