import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    showStatus: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { id } = action.payload;

            const existsItem = state.items.find(item => item.id === id);

            if (existsItem) {
                existsItem.total++;
            } else {
                state.items.push(action.payload);
            }

            state.showStatus = true;
        },
        changeStatus: (state, action) => {
            state.showStatus =
                action.payload.status === 'auto'
                    ? !state.showStatus
                    : action.payload.status;
        },
        updateCartItem: (state, action) => {
            const { id, type } = action.payload;

            const existsItem = state.items.find(item => item.id === id);

            if (type === 'increase') {
                existsItem.total++;
            } else if (type === 'decrease') {
                if (existsItem.total > 1) {
                    existsItem.total--;
                } else {
                    state.items = state.items.filter(
                        item => item.id !== existsItem.id
                    );
                }
            }
        },
        removeItem: (state, action) => {
            const { id } = action.payload;

            state.items = state.items.filter(item => item.id !== id);
        },
    },
});

export default cartSlice.reducer;

export const { addToCart, changeStatus, updateCartItem, removeItem } =
    cartSlice.actions;
