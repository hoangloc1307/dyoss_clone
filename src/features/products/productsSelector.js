import { createSelector } from '@reduxjs/toolkit';

export const selectAllProducts = state => state.products.productList;

export const selectProductTypes = state => state.products.productType;

export const selectProductCategories = state => state.products.productCategory;

export const selectSellingProducts = (state, amount) => {
    return [...state.products.productList]
        .sort((prev, next) => next.sold - prev.sold)
        .slice(0, amount);
};

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

export const selectProductsById = (state, id = []) => {
    return state.products.productList
        .filter(item => id.includes(item.id))
        .sort((prev, next) => id.indexOf(next.id) - id.indexOf(prev.id));
};

export const selectProductsByType = createSelector(
    [selectAllProducts, selectProductTypes, (state, typeName) => typeName],
    (productList, productType, typeName) => {
        const type = productType.find(item => item.name === typeName);
        return productList.filter(item => item.type === type.id);
    }
);

export const selectProductCategoriesByType = createSelector(
    [
        selectProductCategories,
        selectProductTypes,
        (state, typeName) => typeName,
    ],
    (productCategory, productType, typeName) => {
        const type = productType.find(item => item.name === typeName);
        return productCategory.filter(item => item.type.includes(type.id));
    }
);
