import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { Product } from 'models/interfaces/product.interface';
import { ChangeQuantityActionsEnum } from 'models/enums/change-quantity-actions.enum';
import { AddToCartFacadeService } from 'services/add-to-cart-facade.service';
import * as CartSelectors from 'cart/store/cart.selectors';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {
  @Input() public readonly product: Product;
  @Input() public readonly isDescriptionTruncated: boolean;
  public productQuantity$: Observable<number>;

  constructor(private store: Store, private addToCartService: AddToCartFacadeService) { }

  ngOnInit(): void {
    this.productQuantity$ = this.store.pipe(select(CartSelectors.getProductQuantityByID, { id: this.product.id }));
  }

  public onChangeProductQuantity(event: ChangeQuantityActionsEnum): void {
    this.addToCartService.changeProductQuantity(event, this.product);
  }
}
