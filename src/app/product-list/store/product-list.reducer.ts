import { Product } from 'models/interfaces/product.interface';
import { Action, createReducer } from '@ngrx/store';

export interface State {
  products: Product[];
}

const initialState: State = {
  products: [
    {
      id: 1,
      title: 'Some Title',
      desc: 'Some description',
      image: '',
      price: 5,
    },
    {
      id: 2,
      title: 'Some Title',
      desc: 'Some description',
      image: '',
      price: 5,
    },
    {
      id: 3,
      title: 'Some Title',
      desc: 'Some description',
      image: '',
      price: 5,
    },
    {
      id: 4,
      title: 'Some Title',
      desc: 'Some description',
      image: '',
      price: 5,
    },
  ]
};

const productListReducer = createReducer(
  initialState,
);

export function reducer(state: State | undefined, action: Action): State {
  return productListReducer(state, action);
}
