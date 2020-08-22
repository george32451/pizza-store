import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { CartProduct } from 'models/interfaces/cart-product.interface';
import { AddToCartFacadeService } from 'services/add-to-cart-facade.service';
import { ChangeQuantityActionsEnum } from 'models/enums/change-quantity-actions.enum';
import { Order } from 'models/interfaces/order.interface';
import { deliveryCosts } from 'constants/delivery-costs.constants';
import * as fromApp from 'store/app.reducer';
import * as CartSelectors from './store/cart.selectors';
import * as AuthSelectors from 'auth/store/auth.selectors';
import * as CartActions from './store/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public cartProducts$: Observable<CartProduct[]>;
  public totalPrice$: Observable<number>;
  public deliveryCosts = deliveryCosts;

  private ordersDB: AngularFireList<Order>;

  constructor(
    private store: Store<fromApp.AppState>,
    private fireDatabase: AngularFireDatabase,
    private addToCartService: AddToCartFacadeService
  ) { }

  ngOnInit(): void {
    this.cartProducts$ = this.store.pipe(select(CartSelectors.getCartProducts));

    this.totalPrice$ = this.store.pipe(select(CartSelectors.getTotalPrice));

    this.store.pipe(
      select(AuthSelectors.getUser),
      tap(user => {
        this.ordersDB = this.fireDatabase.list<Order>(`/orders/${user?.uid ?? ''}`);
      })
    ).subscribe();
  }

  public onChangeProductQuantity(event: ChangeQuantityActionsEnum, product: CartProduct): void {
    this.addToCartService.changeProductQuantity(event, product);
  }

  public onRemoveProduct(product: CartProduct): void {
    this.store.dispatch(CartActions.removeProductFromCart({ id: product.id }));
  }

  public onResetCart(): void {
    this.store.dispatch(CartActions.resetCart());
  }

  public onPlaceOrder(order: Order): void {
    this.ordersDB.push(order);
  }

  public trackById(index: number, product: CartProduct): number {
    return product.id;
  }
}
