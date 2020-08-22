import { Component, Input, OnInit } from '@angular/core';

import { Order } from 'models/interfaces/order.interface';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  @Input() orders: Order[];

  constructor() { }

  ngOnInit(): void {
  }

  public trackById(index: number, order: Order): number {
    return order.id;
  }
}
