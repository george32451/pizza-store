import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { catchError, map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AngularFireDatabase } from '@angular/fire/database';

import { Product } from 'models/interfaces/product.interface';
import * as ProductListActions from './product-list.actions';
import * as ProductListSelectors from './product-list.selectors';

@Injectable()
export class ProductListEffects {

  getProducts$ = createEffect(() => this.actions$.pipe(
    ofType(ProductListActions.getProductListStart),
    withLatestFrom(this.store.pipe(select(ProductListSelectors.getProducts))),
    switchMap(([_, cachedProducts]) => {
      if (cachedProducts.length) {
        return of(ProductListActions.getProductListSuccess({ products: cachedProducts }));
      }
      return this.fireDatabase.list('/products').valueChanges().pipe(
        take(1),
        map((products: Product[]) => ProductListActions.getProductListSuccess({ products })),
        catchError(() => of(ProductListActions.getProductListFail({ error: 'Something went wrong' })))
      );
    })
  ));

  constructor(
    private actions$: Actions,
    private fireDatabase: AngularFireDatabase,
    private store: Store
  ) {}

}
