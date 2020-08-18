import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SigninFormComponent } from 'signin-form/signin-form.component';
import * as fromApp from 'store/app.reducer';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public productsCounter$: Observable<number>;

  constructor(private modalService: NgbModal, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.productsCounter$ = this.store.pipe(
      select('cart'),
      map(cart => cart.totalCount)
    );
  }

  public onSignin(): void {
    this.modalService.open(SigninFormComponent);
  }
}
