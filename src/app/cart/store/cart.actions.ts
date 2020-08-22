import { createAction, props } from '@ngrx/store';

import { Product } from 'models/interfaces/product.interface';
import { CurrencyEnum } from 'models/enums/currency.enum';

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

export const addDeliveryCosts = createAction(
  '[Cart] Add Delivery Costs',
  props<{ deliveryCosts: number }>()
);

export const resetCart = createAction(
  '[Cart] Reset Cart'
);

export const convertTotalPriceStart = createAction(
  '[Cart] Convert Total Price Start',
  props<{ currency: CurrencyEnum }>()
);

export const convertTotalPriceSuccess = createAction(
  '[Cart] Convert Total Price Success',
  props<{ currentCurrency: CurrencyEnum, multiplier: number }>()
);
