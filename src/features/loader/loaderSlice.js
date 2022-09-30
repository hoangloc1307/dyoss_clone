import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: false,
    progress: 0,
};

const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        changeShowStatus: (state, action) => {
            state.status = action.payload;
        },
        changeProgress: (state, action) => {
            state.progress = action.payload;
        },
    },
});

export const { changeShowStatus, changeProgress } = loaderSlice.actions;

export default loaderSlice.reducer;
