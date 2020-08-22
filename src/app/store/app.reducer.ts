import { ActionReducerMap } from '@ngrx/store';

import * as fromProductList from 'product-list/store/product-list.reducer';
import * as fromCart from 'cart/store/cart.reducer';
import * as fromAuth from 'auth/store/auth.reducer';

export interface AppState {
  productList: fromProductList.State;
  cart: fromCart.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  productList: fromProductList.reducer,
  cart: fromCart.reducer,
  auth: fromAuth.reducer
};
