import { Component, Input, OnInit } from '@angular/core';

import { Product } from 'models/product.interface';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {
  @Input() public readonly product: Product;
  constructor() { }

  ngOnInit(): void {
  }

}
