import { createAction, props } from '@ngrx/store';

import { Product } from 'models/interfaces/product.interface';

export const getProductListStart = createAction('[Product List] Get Product List Start');

export const getProductListSuccess = createAction(
  '[Product List] Get Product List Success',
  props<{ products: Product[] }>()
);

export const getProductListFail = createAction(
  '[Product List] Get Product List Fail',
  props<{ error: string }>()
);
