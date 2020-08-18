import { createSelector } from '@ngrx/store';

import * as fromApp from 'store/app.reducer';

export const selectProductList = (state: fromApp.AppState) => state.productList;

export const getProductByID = createSelector(
    selectProductList,
    (productList, props) => productList.products.find(product => product.id === props.id),
  );
