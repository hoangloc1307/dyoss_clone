import {
    createSlice,
    createAsyncThunk,
    createSelector,
} from '@reduxjs/toolkit';

const initialState = {
    productList: [],
    productType: [],
    productCategory: [],
    status: 'idle',
    error: null,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.productList = state.productList.concat(
                    action.payload[0].products,
                );
                state.productType = state.productType.concat(
                    action.payload[1].types,
                );
                state.productCategory = state.productCategory.concat(
                    action.payload[2].categories,
                );
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default productsSlice.reducer;

//Thunks
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const fetchArray = [];

        fetchArray.push(
            fetch('./fake-data/products.json').then((res) => res.json()),
        );
        fetchArray.push(
            fetch('./fake-data/types.json').then((res) => res.json()),
        );
        fetchArray.push(
            fetch('./fake-data/categories.json').then((res) => res.json()),
        );

        const response = await Promise.all(fetchArray);

        return response;
    },
);

//Selector
export const selectAllProducts = (state) => state.products.productList;

export const selectSellingProducts = (state, amount) => {
    const sellingProducts = state.products.productList.filter(
        (product) => product.sold >= 50,
    );

    return sellingProducts
        .sort((prev, next) => next.sold - prev.sold)
        .slice(0, amount);
};

export const selectProductTypes = (state) => state.products.productType;

export const selectProductsByType = createSelector(
    [
        selectAllProducts,
        selectProductTypes,
        (state, typeName, amount) => typeName,
        (state, typeName, amount) => amount,
    ],
    (productList, productType, typeName, amount) => {
        const type = productType.find((item) => item.name === typeName);
        return productList
            .filter((item) => item.type === type.id)
            .sort((prev, next) => next.view - prev.view)
            .slice(0, amount);
    },
);
