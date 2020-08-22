import { Component, Input, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Order } from 'models/interfaces/order.interface';
import { OrderHistoryDetailsComponent } from './order-history-details/order-history-details.component';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  @Input() orders: Order[];

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  public trackById(index: number, order: Order): number {
    return order.id;
  }

  onOpenOrderModal(order: Order): void {
    const modalRef = this.modalService.open(OrderHistoryDetailsComponent, { size: 'lg' });
    (modalRef.componentInstance as OrderHistoryDetailsComponent).order = order;
  }
}
