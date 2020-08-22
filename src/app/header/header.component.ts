import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SigninFormComponent } from 'auth/signin-form/signin-form.component';
import { User } from 'models/interfaces/user.interface';
import { CurrencyEnum } from 'models/enums/currency.enum';
import { TotalPrice } from 'models/types/price.type';
import * as fromApp from 'store/app.reducer';
import * as AuthSelectors from 'auth/store/auth.selectors';
import * as CartSelectors from 'cart/store/cart.selectors';
import * as CartActions from 'cart/store/cart.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public productsCounter$: Observable<number>;
  public isAuthenticated$: Observable<boolean>;
  public totalPrice$: Observable<TotalPrice>;
  public user$: Observable<User>;
  public currencies = CurrencyEnum;

  constructor(private modalService: NgbModal, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.productsCounter$ = this.store.pipe(
      select('cart'),
      map(cart => cart.totalCount)
    );

    this.totalPrice$ = this.store.pipe(
      select(CartSelectors.getTotalPrice)
    );

    this.isAuthenticated$ = this.store.pipe(
      select(AuthSelectors.isAuthenticated)
    );

    this.user$ = this.store.pipe(
      select(AuthSelectors.getUser)
    );
  }

  public onSignin(): void {
    this.modalService.open(SigninFormComponent);
  }

  convert(currency: CurrencyEnum): void {
    this.store.dispatch(CartActions.convertTotalPriceStart({ currency }));
  }
}
