import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { User } from 'models/interfaces/user.interface';
import * as AuthSelectors from 'auth/store/auth.selectors';
import * as AuthActions from 'auth/store/auth.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user$: Observable<User>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(AuthSelectors.getUser));
  }

  public onLogout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
