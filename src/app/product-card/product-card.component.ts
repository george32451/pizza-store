import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { Product } from 'models/interfaces/product.interface';
import { getProductByID } from 'product-list/store/product-list.selectors';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  public product$: Observable<Product>;

  constructor(private route: ActivatedRoute, private store: Store) { }

  ngOnInit(): void {
    this.product$ = this.store.pipe(
      select(getProductByID, { id: Number(this.route.snapshot.params.id) })
    );
  }

}
