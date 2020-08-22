import { Action, createReducer, on } from '@ngrx/store';

import { CartProduct } from 'models/interfaces/cart-product.interface';
import { TotalPrice } from 'models/types/price.type';
import { CurrencyEnum } from 'models/enums/currency.enum';
import * as CartActions from './cart.actions';

export interface State {
  products: CartProduct[];
  totalPrice: TotalPrice;
  totalCount: number;
}

const initialState: State = {
  products: [],
  totalPrice: { baseAmount: '0', currencyBasedAmount: '0', currency: CurrencyEnum.USD, multiplier: 1 },
  totalCount: 0,
};

const cartReducer = createReducer(
  initialState,
  on(CartActions.addProductToCart, (state, { product }) => {
    const newCartProduct: CartProduct = { ...product, quantity: 1 };
    const newTotalPrice = addPrice(state.totalPrice.baseAmount, product.price.amount);
    return {
      ...state,
      products: [...state.products, newCartProduct],
      totalCount: state.totalCount + 1,
      totalPrice: {
        ...state.totalPrice,
        baseAmount: newTotalPrice,
        currencyBasedAmount: (Number(newTotalPrice) * Number(state.totalPrice.multiplier.toFixed(2))).toFixed(2)
      }
    };
  }),
  on(CartActions.removeProductFromCart, (state, { id }) => {
    const productToDelete = state.products.find(product => product.id === id);
    const updatedProducts = state.products.filter(product => product.id !== id);
    const newTotalPrice = subPrice(state.totalPrice.baseAmount, multiplePrice(productToDelete.price.amount, productToDelete.quantity));
    return {
      ...state,
      products: updatedProducts,
      totalCount: state.totalCount - productToDelete.quantity,
      totalPrice: {
        ...state.totalPrice,
        baseAmount: newTotalPrice,
        currencyBasedAmount: (Number(newTotalPrice) * Number(state.totalPrice.multiplier.toFixed(2))).toFixed(2)
      }
    };
  }),
  on(CartActions.incProductQuantity, ((state, { id }) => {
    const cartProductIndex = state.products.findIndex(product => product.id === id);
    const updatedCartProduct = { ...state.products[cartProductIndex]  };
    const updatedProducts = [...state.products];
    updatedProducts[cartProductIndex] = { ...updatedCartProduct, quantity: updatedCartProduct.quantity + 1 };
    const newTotalPrice = addPrice(state.totalPrice.baseAmount, updatedCartProduct.price.amount);
    return {
      ...state,
      products: updatedProducts,
      totalCount: state.totalCount + 1,
      totalPrice: {
        ...state.totalPrice,
        baseAmount: newTotalPrice,
        currencyBasedAmount: (Number(newTotalPrice) * Number(state.totalPrice.multiplier.toFixed(2))).toFixed(2)
      }
    };
  })),
  on(CartActions.decProductQuantity, ((state, { id }) => {
    const cartProductIndex = state.products.findIndex(product => product.id === id);
    const cartProduct = state.products[cartProductIndex];
    let updatedProducts = [...state.products];
    const newTotalPrice = subPrice(state.totalPrice.baseAmount, cartProduct.price.amount);
    if (cartProduct.quantity === 1) {
      updatedProducts = updatedProducts.filter(product => product.id !== id);
    } else {
      updatedProducts[cartProductIndex] = { ...cartProduct, quantity: cartProduct.quantity - 1 };
    }

    return {
      ...state,
      products: updatedProducts,
      totalCount: state.totalCount - 1,
      totalPrice: {
        ...state.totalPrice,
        baseAmount: newTotalPrice,
        currencyBasedAmount: (Number(newTotalPrice) * Number(state.totalPrice.multiplier.toFixed(2))).toFixed(2)
      }
    };
  })),
  on(CartActions.addDeliveryCosts, ((state, { deliveryCosts }) => {
    const newTotalPrice = addPrice(state.totalPrice.baseAmount, deliveryCosts.toFixed(2));
    return {
      ...state,
      totalPrice: {
        ...state.totalPrice,
        baseAmount: newTotalPrice,
        currencyBasedAmount: (Number(newTotalPrice) * Number(state.totalPrice.multiplier.toFixed(2))).toFixed(2)
      }
    };
  })),
  on(CartActions.convertTotalPriceSuccess, (((state, { currentCurrency, multiplier }) => {
    return {
      ...state,
      totalPrice: {
        ...state.totalPrice,
        multiplier: Number(multiplier.toFixed(2)),
        currency: currentCurrency,
        currencyBasedAmount: (Number(state.totalPrice.baseAmount) * Number(multiplier.toFixed(2))).toFixed(2)
      }
    };
  }))),
  on(CartActions.resetCart, (state => ({ ...state, ...initialState })))
);

export function reducer(state: State | undefined, action: Action): State {
  return cartReducer(state, action);
}

function addPrice(price1: string, price2: string): string {
  return ((Number(price1) * 100 + Number(price2) * 100) / 100).toFixed(2);
}

function multiplePrice(price: string, times: number): string {
  return ((Number(price) * 100 * times) / 100).toFixed(2);
}

function subPrice(price1: string, price2: string): string {
  return ((Number(price1) * 100 - Number(price2) * 100) / 100).toFixed(2);
}
