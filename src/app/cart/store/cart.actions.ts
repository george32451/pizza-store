import { createAction, props } from '@ngrx/store';

import { Product } from '../../models/interfaces/product.interface';

export const addProductToCart = createAction(
  '[Cart] Add Product',
  props<{ product: Product }>()
);

export const removeProductFromCart = createAction(
  '[Cart] Remove Product',
  props<{ id: number }>()
);

export const incProductQuantity = createAction(
  '[Cart] Increase Product Quantity',
  props<{ id: number }>()
);

export const decProductQuantity = createAction(
  '[Cart] Decrease Product Quantity',
  props<{ id: number }>()
);

export const resetCart = createAction(
  '[Cart] Reset Cart'
);
