import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    keyword: '',
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setKeywordValue: (state, action) => {
            state.keyword = action.payload;
        },
    },
});

export const { setKeywordValue } = searchSlice.actions;

export default searchSlice.reducer;
