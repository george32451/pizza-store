import { Action, createReducer, on } from '@ngrx/store';

import * as CartActions from './cart.actions';
import { CartProduct } from '../../models/types/cart-product.type';

export interface State {
  products: CartProduct[];
  totalPrice: number;
  totalCount: number;
}

const initialState: State = {
  products: [],
  totalPrice: 0,
  totalCount: 0
};

const cartReducer = createReducer(
  initialState,
  on(CartActions.addProductToCart, (state, { product }) => {
    const existedCartProductIndex = state.products.findIndex(stateProduct => stateProduct.id === product.id);
    let newCartProduct: CartProduct;

    if (existedCartProductIndex !== -1) {
      newCartProduct = { id: product.id, price: product.price, quantity: state.products[existedCartProductIndex].quantity + 1  };
      const updatedProducts = [...state.products];
      updatedProducts[existedCartProductIndex] = newCartProduct;

      return {
        ...state,
        products: updatedProducts,
        totalCount: state.totalCount + 1,
        totalPrice: state.totalPrice + product.price
      };
    }

    newCartProduct = { id: product.id, price: product.price, quantity: 1 };

    return {
      ...state,
      products: [...state.products, newCartProduct],
      totalCount: state.totalCount + 1,
      totalPrice: state.totalPrice + product.price
    };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return cartReducer(state, action);
}
