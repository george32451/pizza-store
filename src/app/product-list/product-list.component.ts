import { Component, OnInit } from '@angular/core';

import { Product } from 'models/product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public products: Product[] = [
    {
      id: 1,
      title: 'Some Title',
      desc: 'Some description',
      image: ''
    },
    {
      id: 2,
      title: 'Some Title',
      desc: 'Some description',
      image: ''
    },
    {
      id: 3,
      title: 'Some Title',
      desc: 'Some description',
      image: ''
    },
    {
      id: 4,
      title: 'Some Title',
      desc: 'Some description',
      image: ''
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  public trackById(index: number, product: Product): number {
    return product.id;
  }

}
