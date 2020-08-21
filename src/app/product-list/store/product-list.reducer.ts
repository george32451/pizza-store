import { Product } from 'models/interfaces/product.interface';
import { Action, createReducer, on } from '@ngrx/store';

import * as ProductListActions from './product-list.actions';

export interface State {
  products: Product[];
  error: string;
  isLoading: boolean;
}

const initialState: State = {
  products: [],
  error: null,
  isLoading: false,
};

const productListReducer = createReducer(
  initialState,
  on(ProductListActions.getProductListStart, (state => ({ ...state, isLoading: true, error: null }))),
  on(ProductListActions.getProductListSuccess, ((state, { products }) => ({ ...state, products, isLoading: false, error: null }))),
  on(ProductListActions.getProductListFail, ((state, { error }) => ({ ...state, isLoading: false, error }))),
);

export function reducer(state: State | undefined, action: Action): State {
  return productListReducer(state, action);
}
