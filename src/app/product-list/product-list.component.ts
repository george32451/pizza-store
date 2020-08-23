import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { Product } from 'models/interfaces/product.interface';
import * as fromApp from 'store/app.reducer';
import * as ProductListActions from './store/product-list.actions';
import * as ProductListSelectors from './store/product-list.selectors';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public products$: Observable<Product[]>;
  public isLoading$: Observable<boolean>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(ProductListActions.getProductListStart());
    this.products$ = this.store.pipe(select(ProductListSelectors.getProducts));
    this.isLoading$ = this.store.pipe(select(ProductListSelectors.isProductListLoading));
  }

  public trackById(index: number, product: Product): number {
    return product.id;
  }

}
