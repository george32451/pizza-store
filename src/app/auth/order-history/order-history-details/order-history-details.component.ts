import { Component, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Order } from 'models/interfaces/order.interface';
import { deliveryCosts } from 'constants/delivery-costs.constants';
import { BaseModalComponent } from 'shared/modals/base-modal/base-modal.component';

@Component({
  selector: 'app-order-history-details',
  templateUrl: './order-history-details.component.html',
  styleUrls: ['./order-history-details.component.scss']
})
export class OrderHistoryDetailsComponent extends BaseModalComponent {
  @Input() public order: Order;
  public readonly deliveryCosts = deliveryCosts;

  constructor(protected activeModal: NgbActiveModal) {
    super(activeModal);
  }

}
