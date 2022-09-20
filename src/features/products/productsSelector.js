import { createSelector } from '@reduxjs/toolkit';

export const selectAllProducts = state => state.products.productList;

export const selectSellingProducts = (state, amount) => {
    return [...state.products.productList]
        .sort((prev, next) => next.sold - prev.sold)
        .slice(0, amount);
};

export const selectProductTypes = state => state.products.productType;

export const selectProductsByType = createSelector(
    [
        selectAllProducts,
        selectProductTypes,
        (state, typeName, amount) => typeName,
        (state, typeName, amount) => amount,
    ],
    (productList, productType, typeName, amount) => {
        const type = productType.find(item => item.name === typeName);
        return productList
            .filter(item => item.type === type.id && item.stock > 0)
            .sort((prev, next) => next.view - prev.view)
            .slice(0, amount);
    }
);

export const selectProductBySlug = (state, slug) => {
    const product = state.products.productList.find(item => item.link === slug);
    return product;
};

export const selectProductsRelated = (state, id, type, category, amount) => {
    return state.products.productList
        .filter(
            item =>
                item.id !== id &&
                item.type === type &&
                item.category === category &&
                item.stock > 0
        )
        .slice(0, amount);
};
