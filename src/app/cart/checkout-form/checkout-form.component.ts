import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { firestore } from 'firebase';

import { Price } from 'models/types/price.type';
import { CartProduct } from 'models/interfaces/cart-product.interface';
import { Order } from 'models/interfaces/order.interface';
import * as AuthSelectors from 'auth/store/auth.selectors';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})
export class CheckoutFormComponent implements OnInit {
  @Input() public readonly cartProducts: CartProduct[];
  @Input() public readonly totalPrice: Price;
  public orders: AngularFireList<Order>;

  constructor(private fireDatabase: AngularFireDatabase, private store: Store) { }

  ngOnInit(): void {
    // TODO
     this.store
       .pipe(
          select(AuthSelectors.getUser),
          tap(user => {
            this.orders = this.fireDatabase.list(`/orders/${user?.uid ?? ''}`);
            this.orders.valueChanges()
              .subscribe(orders => console.log(
                new firestore.Timestamp(orders[0].timestamp.seconds, orders[0].timestamp.nanoseconds
                ).toDate())
              );
          })
        )
       .subscribe();
  }

  onPlaceOrder(checkoutForm: NgForm): void {
    const order: Order = {
      id: 1,
      timestamp: firestore.Timestamp.now(),
      address: checkoutForm.value.address.trim(),
      address2: checkoutForm.value.address2.trim(),
      client: {
        displayName: checkoutForm.value.fullName,
        email: checkoutForm.value.email
      },
      products: this.cartProducts,
      totalPrice: this.totalPrice
    };
    this.orders.push(order);
  }
}
