import { Component, OnInit } from '@angular/core';

import { filter, take } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { select, Store } from '@ngrx/store';

import * as AuthActions from 'auth/store/auth.actions';
import * as AuthSelectors from 'auth/store/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private firebaseAuth: AngularFireAuth, private store: Store) {
  }

  ngOnInit(): void {
    // TODO: check how long is angular firebase session lives and decide what to do with this check
    forkJoin({
      firebaseUser: this.firebaseAuth.authState,
      isAuthenticated: this.store.pipe(select(AuthSelectors.isAuthenticated))
    })
      .pipe(
        filter(({ firebaseUser, isAuthenticated }) => !firebaseUser && isAuthenticated),
        take(1)
      )
      .subscribe(() => this.store.dispatch(AuthActions.logout()));
  }
}
