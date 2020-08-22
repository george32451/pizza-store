import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { from, Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, take, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TypedAction } from '@ngrx/store/src/models';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import * as AuthActions from './auth.actions';
import { User } from 'models/interfaces/user.interface';
import { SocialAuthProvidersEnum } from 'models/enums/social-auth-providers.enum';
import { AuthErrorCodesEnum } from 'models/enums/auth-error-codes.enum';
import { AuthErrorMessagesEnum } from 'models/enums/auth-error-messages.enum';

@Injectable()
export class AuthEffects {

  authSignin$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.signinStart),
    exhaustMap(({ email, password }) => from(this.firebaseAuth.signInWithEmailAndPassword(email, password))
      .pipe(
        switchMap(() => from(this.firebaseAuth.setPersistence(auth.Auth.Persistence.LOCAL))),
        switchMap(() => this.firebaseAuth.authState.pipe(take(1))),
        map(this.authSuccessRoutine),
        catchError(this.handleError)
      ))
    )
  );

  authSignup$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.signupStart),
    exhaustMap(({ email, password, displayName }) => from(this.firebaseAuth.createUserWithEmailAndPassword(email, password))
      .pipe(
        switchMap(firebaseUser => firebaseUser.user.updateProfile({ displayName })),
        switchMap(() => from(this.firebaseAuth.setPersistence(auth.Auth.Persistence.LOCAL))),
        switchMap(() => this.firebaseAuth.authState.pipe(take(1))),
        map(this.authSuccessRoutine),
        catchError(this.handleError)
      ))
    )
  );

  socialAuth$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.socialAuthStart),
    exhaustMap(({ provider }) => from(this.firebaseAuth.signInWithPopup(this.chooseSocialAuthProvider(provider)))
      .pipe(
        switchMap(() => from(this.firebaseAuth.setPersistence(auth.Auth.Persistence.LOCAL))),
        switchMap(() => this.firebaseAuth.authState.pipe(take(1))),
        map(this.authSuccessRoutine),
        catchError(this.handleError)
      ))
    )
  );

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logout),
    switchMap(() => this.firebaseAuth.signOut()),
    tap(() => this.router.navigate(['/products']))
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private firebaseAuth: AngularFireAuth,
    private router: Router
  ) {}

  private authSuccessRoutine({ uid, email, displayName, photoURL }): TypedAction<string> & { user: User } {
    const user: User = { uid, email, displayName, photoURL };

    return AuthActions.authSuccess({ user });
  }

  private chooseSocialAuthProvider(provider: SocialAuthProvidersEnum): auth.AuthProvider {
    switch (provider) {
      case SocialAuthProvidersEnum.GOOGLE:
        return new auth.GoogleAuthProvider();
    }
  }

  private handleError(error: auth.Error): Observable<TypedAction<string> & { error: string }> {
    let errorMessage = 'An unknown error occurred!';

    if (!error.code) {
      return of(AuthActions.authFail({ error: errorMessage }));
    }

    switch (error.code) {
      case AuthErrorCodesEnum.USER_NOT_FOUNT:
      case AuthErrorCodesEnum.WRONG_PASSWORD:
        errorMessage = AuthErrorMessagesEnum.INVALID_CREDENTIALS;
        break;
      case AuthErrorCodesEnum.USER_DISABLED:
        errorMessage = AuthErrorMessagesEnum.USER_DISABLED;
        break;
      case AuthErrorCodesEnum.EMAIL_ALREADY_IN_USE:
        errorMessage = AuthErrorMessagesEnum.EMAIL_ALREADY_IN_USE;
        break;
      case AuthErrorCodesEnum.INVALID_EMAIL:
        errorMessage = AuthErrorMessagesEnum.INVALID_EMAIL;
        break;
      case AuthErrorCodesEnum.WEAK_PASSWORD:
        errorMessage = AuthErrorMessagesEnum.WEAK_PASSWORD;
        break;
    }

    return of(AuthActions.authFail({ error: errorMessage }));
  }
}
