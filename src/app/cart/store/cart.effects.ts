import { Injectable } from '@angular/core';

import { filter, map, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Product } from 'models/interfaces/product.interface';
import { deliveryCosts } from 'constants/delivery-costs.constants';
import * as CartActions from './cart.actions';
import * as CartSelectors from './cart.selectors';

@Injectable()
export class CartEffects {

  resetCart$ = createEffect(() => this.actions$.pipe(
      ofType(CartActions.removeProductFromCart, CartActions.decProductQuantity),
      withLatestFrom(this.store.pipe(select(CartSelectors.getCartProducts))),
      filter(([_, products]) => this.isLastProductRemovedFromCart(products)),
      map(() => CartActions.resetCart())
    )
  );

  addDeliveryCosts$ = createEffect(() => this.actions$.pipe(
    ofType(CartActions.addProductToCart),
    withLatestFrom(this.store.pipe(select(CartSelectors.getCartProducts))),
    filter(([_, products]) => this.isFirstProductAddedFromCart(products)),
    map(() => CartActions.addDeliveryCosts({ deliveryCosts }))
    )
  );

  constructor(private actions$: Actions, private store: Store) {}

  private isFirstProductAddedFromCart(products: Product[]): boolean {
    return products.length === 1;
  }

  private isLastProductRemovedFromCart(products: Product[]): boolean {
    return products.length === 0;
  }
}
