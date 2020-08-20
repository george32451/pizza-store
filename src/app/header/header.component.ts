import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SigninFormComponent } from 'auth/signin-form/signin-form.component';
import { User } from 'models/interfaces/user.interface';
import * as fromApp from 'store/app.reducer';
import * as AuthSelectors from 'auth/store/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public productsCounter$: Observable<number>;
  public isAuthenticated$: Observable<boolean>;
  public user$: Observable<User>;

  constructor(private modalService: NgbModal, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.productsCounter$ = this.store.pipe(
      select('cart'),
      map(cart => cart.totalCount)
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
}
