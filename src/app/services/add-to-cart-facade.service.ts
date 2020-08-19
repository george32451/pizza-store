import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { ChangeQuantityActionsEnum } from 'models/enums/change-quantity-actions.enum';
import { Product } from 'models/interfaces/product.interface';
import * as CartActions from 'cart/store/cart.actions';

@Injectable({
  providedIn: 'root'
})
export class AddToCartFacadeService {

  constructor(private store: Store) { }

  public changeProductQuantity(event: ChangeQuantityActionsEnum, product: Product): void {
    switch (event) {
      case ChangeQuantityActionsEnum.ADD:
        this.store.dispatch(CartActions.addProductToCart({ product }));
        break;
      case ChangeQuantityActionsEnum.INCREMENT:
        this.store.dispatch(CartActions.incProductQuantity({ id: product.id }));
        break;
      case ChangeQuantityActionsEnum.DECREMENT:
        this.store.dispatch(CartActions.decProductQuantity({ id: product.id }));
        break;
    }
  }
}
