import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { User } from 'models/interfaces/user.interface';

export interface State {
  user: User;
  error: string;
  isLoading: boolean;
}

const initialState: State = {
  user: null,
  error: null,
  isLoading: false
};

const authReducer = createReducer(
  initialState,
  on(
    AuthActions.signinStart,
    AuthActions.signupStart,
    (state) => ({ ...state, isLoading: true, error: null })),
  on(AuthActions.authSuccess, ((state, { user }) => ({ ...state, user, isLoading: false, error: null }))),
  on(AuthActions.authFail, ((state, { error }) => ({ ...state, error, isLoading: false }))),
  on(AuthActions.logout, (state => ({ ...state, user: null, isLoading: false, error: null }))),
  on(AuthActions.clearAuthError, (state => ({ ...state, error: null }))),
);

export function reducer(state: State | undefined, action: Action): State {
  return authReducer(state, action);
}
