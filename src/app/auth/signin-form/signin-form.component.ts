import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { SocialAuthProvidersEnum } from 'models/enums/social-auth-providers.enum';
import * as fromApp from 'store/app.reducer';
import * as AuthActions from 'auth/store/auth.actions';
import * as AuthSelectors from 'auth/store/auth.selectors';

enum LoginActions {
  SIGNIN,
  SIGNUP
}

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss']
})
export class SigninFormComponent implements OnDestroy, OnInit {
  public loginActions: typeof LoginActions = LoginActions;
  public currentLoginAction: LoginActions = LoginActions.SIGNIN;
  public authError$: Observable<string>;
  public isAuthInProgress$: Observable<boolean>;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private store: Store<fromApp.AppState>, private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.store.dispatch(AuthActions.clearAuthError());
    this.authError$ = this.store.pipe(select(AuthSelectors.getAuthError));
    this.isAuthInProgress$ = this.store.pipe(select(AuthSelectors.getIsAuthInProgress));
    this.store
      .pipe(
        select(AuthSelectors.isAuthenticated),
        takeUntil(this.destroy$)
      )
      .subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.activeModal.close();
      }
    });
  }

  public onChangeLoginAction(action: LoginActions): void {
    this.currentLoginAction = action;
  }

  onSignin(form: NgForm): void {
    const email: string = form.value.email.trim();
    const password: string = form.value.password.trim();

    this.store.dispatch(AuthActions.signinStart({ email, password }));
    form.reset();
  }

  onSignup(form: NgForm): void {
    const email: string = form.value.email.trim();
    const password: string = form.value.password.trim();
    const displayName = `${form.value.firstName.trim()} ${form.value.lastName.trim()}`;

    this.store.dispatch(AuthActions.signupStart({ email, password, displayName }));
  }

  public authorizeWithGoogle(): void {
    this.store.dispatch(AuthActions.socialAuthStart({ provider: SocialAuthProvidersEnum.GOOGLE }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
