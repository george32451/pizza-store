import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { firestore } from 'firebase/app';

import { Price } from 'models/types/price.type';
import { CartProduct } from 'models/interfaces/cart-product.interface';
import { Order } from 'models/interfaces/order.interface';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})
export class CheckoutFormComponent {
  @Input() public readonly cartProducts: CartProduct[];
  @Input() public readonly totalPrice: Price;
  @Output() public readonly placeOrder: EventEmitter<Order> = new EventEmitter<Order>();

  onPlaceOrder(checkoutForm: NgForm): void {
    const order: Order = {
      id: firestore.Timestamp.now().seconds,
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
    this.placeOrder.emit(order);
  }
}
