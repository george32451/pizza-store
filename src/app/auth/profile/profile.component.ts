import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, filter, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AngularFireDatabase } from '@angular/fire/database';

import { User } from 'models/interfaces/user.interface';
import { Order } from 'models/interfaces/order.interface';
import * as AuthSelectors from 'auth/store/auth.selectors';
import * as AuthActions from 'auth/store/auth.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user$: Observable<User>;
  public orders$: Observable<Order[]>;

  constructor(private store: Store, private fireDatabase: AngularFireDatabase) { }

  ngOnInit(): void {
    this.user$ = this.store
      .pipe(
        select(AuthSelectors.getUser),
        filter(user => !!user),
        tap(user => {
          this.orders$ = this.fireDatabase.list<Order>(`/orders/${user.uid}`).valueChanges()
            .pipe(catchError(() => of([])));
        })
      );
  }

  public onLogout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
