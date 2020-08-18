import { Component, Input, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromApp from 'store/app.reducer';
import * as CartActions from 'cart/store/cart.actions';
import { Product } from '../../models/interfaces/product.interface';

@Component({
  selector: 'app-add-to-cart-button',
  templateUrl: './add-to-cart-button.component.html',
  styleUrls: ['./add-to-cart-button.component.scss']
})
export class AddToCartButtonComponent implements OnInit {
  @Input() product: Product;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
  }

  public onAddToCart(product: Product = this.product): void {
    this.store.dispatch(CartActions.addProductToCart({ product }));
  }

}
