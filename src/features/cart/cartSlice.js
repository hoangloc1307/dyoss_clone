import { createSlice, nanoid } from '@reduxjs/toolkit';
import * as _ from 'lodash';

const initialState = {
    items: [],
    showStatus: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: {
            reducer(state, action) {
                const { id, option } = action.payload;

                const existsItem = state.items.find(item => item.id === id && _.isEqual(item.option, option));

                if (existsItem) {
                    existsItem.amount++;
                } else {
                    state.items.push(action.payload);
                }

                state.showStatus = true;
            },
            prepare(id, name, price, link, image, option) {
                return {
                    payload: {
                        cartId: nanoid(),
                        amount: 1,
                        id,
                        name,
                        price,
                        link,
                        image,
                        option,
                    },
                };
            },
        },
        changeStatus(state, action) {
            state.showStatus = action.payload.status === 'auto' ? !state.showStatus : action.payload.status;
        },
        updateCartItem(state, action) {
            const { cartId, type } = action.payload;

            const existsItem = state.items.find(item => item.cartId === cartId);

            if (type === 'increase') {
                existsItem.amount++;
            } else if (type === 'decrease') {
                if (existsItem.amount > 1) {
                    existsItem.amount--;
                } else {
                    state.items = state.items.filter(item => item.cartId !== existsItem.cartId);
                }
            }
        },
        removeItem(state, action) {
            const { cartId } = action.payload;

            state.items = state.items.filter(item => item.cartId !== cartId);
        },
    },
});

export default cartSlice.reducer;

export const { addToCart, changeStatus, updateCartItem, removeItem } = cartSlice.actions;
