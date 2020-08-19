import { createSelector } from '@ngrx/store';

import * as fromApp from 'store/app.reducer';

export const selectCart = (state: fromApp.AppState) => state.cart;

const startQuantity = 0;

export const getProductQuantityByID = createSelector(
  selectCart,
  (cart, props) => cart.products.find(product => product.id === props.id)?.quantity || startQuantity,
);

export const getTotalPrice = createSelector(
  selectCart,
  (cart) => cart.totalPrice
);
