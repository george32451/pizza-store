import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { Product } from 'models/interfaces/product.interface';
import * as fromApp from 'store/app.reducer';
import * as ProductListActions from './store/product-list.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public products$: Observable<Product[]>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(ProductListActions.getProductListStart());
    this.products$ = this.store.pipe(
      select('productList'),
      map(productList => productList.products)
    );
  }

  public trackById(index: number, product: Product): number {
    return product.id;
  }

}
