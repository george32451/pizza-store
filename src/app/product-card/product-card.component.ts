import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { Product } from 'models/interfaces/product.interface';
import { ChangeQuantityActionsEnum } from 'models/enums/change-quantity-actions.enum';
import { AddToCartFacadeService } from 'services/add-to-cart-facade.service';
import * as ProductListSelectors from 'product-list/store/product-list.selectors';
import * as ProductListActions from 'product-list/store/product-list.actions';
import * as CartSelectors from 'cart/store/cart.selectors';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  public product$: Observable<Product>;
  public productQuantity$: Observable<number>;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private addToCartService: AddToCartFacadeService
  ) { }

  ngOnInit(): void {
    const productID = Number(this.route.snapshot.params.id);
    this.product$ = this.store.pipe(
      select(ProductListSelectors.getProductByID, { id: Number(this.route.snapshot.params.id) }),
      tap((product: Product) => {
        if (!product) {
          this.store.dispatch(ProductListActions.getProductListStart());
        }
      }),
      filter(product => !!product),
    );
    this.productQuantity$ = this.store.pipe(select(CartSelectors.getProductQuantityByID, { id: productID }));
  }

  public onChangeProductQuantity(event: ChangeQuantityActionsEnum, product: Product): void {
    this.addToCartService.changeProductQuantity(event, product);
  }
}
