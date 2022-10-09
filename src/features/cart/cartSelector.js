export const selectCartItems = state => state.cart.items;

export const selectTotalItems = state => {
    return state.cart.items.reduce((total, item) => (total += item.amount), 0);
};

export const selectTotalPrice = state => {
    return state.cart.items.reduce((total, item) => (total += item.amount * item.price), 0);
};

export const selectShowStatus = state => state.cart.showStatus;
