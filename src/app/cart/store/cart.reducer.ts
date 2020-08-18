import { Action, createReducer, on } from '@ngrx/store';

import * as CartActions from './cart.actions';
import { CartProduct } from 'models/interfaces/cart-product.interface';

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
    const newCartProduct: CartProduct = { ...product, quantity: 1 };

    return {
      ...state,
      products: [...state.products, newCartProduct],
      totalCount: state.totalCount + 1,
      totalPrice: state.totalPrice + product.price
    };
  }),
  on(CartActions.incProductQuantity, ((state, { id }) => {
    const cartProductIndex = state.products.findIndex(product => product.id === id);
    const updatedCartProduct = { ...state.products[cartProductIndex]  };
    const updatedProducts = [...state.products];
    updatedProducts[cartProductIndex] = { ...updatedCartProduct, quantity: updatedCartProduct.quantity + 1 };

    return {
      ...state,
      products: updatedProducts,
      totalCount: state.totalCount + 1,
      totalPrice: state.totalPrice + updatedCartProduct.price
    };
  })),
  on(CartActions.decProductQuantity, ((state, { id }) => {
    const cartProductIndex = state.products.findIndex(product => product.id === id);
    const cartProduct = state.products[cartProductIndex];
    let updatedProducts = [...state.products];

    if (cartProduct.quantity === 1) {
      updatedProducts = updatedProducts.filter(product => product.id !== id);
    } else {
      updatedProducts[cartProductIndex] = { ...cartProduct, quantity: cartProduct.quantity - 1 };
    }

    return {
      ...state,
      products: updatedProducts,
      totalCount: state.totalCount - 1,
      totalPrice: state.totalPrice - cartProduct.price
    };
  }))
);

export function reducer(state: State | undefined, action: Action): State {
  return cartReducer(state, action);
}
