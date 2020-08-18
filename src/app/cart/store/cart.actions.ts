import { createAction, props } from '@ngrx/store';

import { Product } from '../../models/interfaces/product.interface';

export const addProductToCart = createAction(
  '[Cart] Add Product',
  props<{ product: Product }>()
);
