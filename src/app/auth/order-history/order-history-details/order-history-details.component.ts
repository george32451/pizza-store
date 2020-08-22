import { Component, Input } from '@angular/core';

import { Order } from 'models/interfaces/order.interface';
import { deliveryCosts } from 'constants/delivery-costs.constants';

@Component({
  selector: 'app-order-history-details',
  templateUrl: './order-history-details.component.html',
  styleUrls: ['./order-history-details.component.scss']
})
export class OrderHistoryDetailsComponent {
  @Input() public order: Order;
  public readonly deliveryCosts = deliveryCosts;

}
