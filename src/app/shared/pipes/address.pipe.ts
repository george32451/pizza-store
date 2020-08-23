import { Pipe, PipeTransform } from '@angular/core';

import { Order } from 'models/interfaces/order.interface';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

  transform(order: Order): string {
    return `${order.address}${order.address2 ? `, ${order.address2}` : ''}`;
  }

}
