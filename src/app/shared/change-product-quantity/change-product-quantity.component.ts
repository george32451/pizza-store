import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ChangeQuantityActionsEnum } from 'models/enums/change-quantity-actions.enum';
import { Product } from '../../models/interfaces/product.interface';

@Component({
  selector: 'app-change-product-quantity',
  templateUrl: './change-product-quantity.component.html',
  styleUrls: ['./change-product-quantity.component.scss']
})
export class ChangeProductQuantityComponent implements OnInit {
  @Input() public readonly product: Product;
  @Input() public readonly productQuantity: number;
  @Output() public readonly changeQuantity: EventEmitter<ChangeQuantityActionsEnum> = new EventEmitter<ChangeQuantityActionsEnum>();

  public readonly changeQuantityActions: typeof ChangeQuantityActionsEnum = ChangeQuantityActionsEnum;

  constructor() { }

  ngOnInit(): void {
  }

  public onChangeProductQuantity(action: ChangeQuantityActionsEnum): void {
    this.changeQuantity.emit(action);
  }
}
