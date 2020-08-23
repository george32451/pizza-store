import { Pipe, PipeTransform } from '@angular/core';

import { CartProduct } from 'models/interfaces/cart-product.interface';

@Pipe({
  name: 'productQuantity'
})
export class ProductQuantityPipe implements PipeTransform {

  transform(product: CartProduct): string {
    return (Number(product.price.amount) * product.quantity).toFixed(2);
  }

}
