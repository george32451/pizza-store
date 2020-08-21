import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AngularFireDatabase } from '@angular/fire/database';

import * as ProductListActions from './product-list.actions';
import { Product } from 'models/interfaces/product.interface';

@Injectable()
export class ProductListEffects {

  getProducts$ = createEffect(() => this.actions$.pipe(
    ofType(ProductListActions.getProductListStart),
    switchMap(() => this.fireDatabase.list('/products').valueChanges()
      .pipe(
        take(1),
        map((products: Product[]) => ProductListActions.getProductListSuccess({ products })),
        catchError(() => of(ProductListActions.getProductListFail({ error: 'Something went wrong' })))
      ))
    )
  );

  constructor(private actions$: Actions, private fireDatabase: AngularFireDatabase) {}

}
