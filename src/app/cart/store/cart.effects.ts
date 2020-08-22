import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Product } from 'models/interfaces/product.interface';
import { CurrencyEnum } from 'models/enums/currency.enum';
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

  convertTotalPrice$ = createEffect(() => this.actions$.pipe(
    ofType(CartActions.convertTotalPriceStart),
    switchMap(({ currency }) => this.http.get<{ base: CurrencyEnum, rates: { [key in CurrencyEnum]: number } }>(
      `https://api.exchangeratesapi.io/latest?base=USD&symbols=${currency}`
    ).pipe(
      map((currencyRates) => {
        return CartActions.convertTotalPriceSuccess({ currentCurrency: currency, multiplier: currencyRates.rates[currency] });
      })
    )),
  ));

  constructor(private actions$: Actions, private store: Store, private http: HttpClient) {}

  private isFirstProductAddedFromCart(products: Product[]): boolean {
    return products.length === 1;
  }

  private isLastProductRemovedFromCart(products: Product[]): boolean {
    return products.length === 0;
  }
}
