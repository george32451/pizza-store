import { createSelector } from '@ngrx/store';

import * as fromApp from 'store/app.reducer';

export const selectAuth = (state: fromApp.AppState) => state.auth;

export const getAuthError = createSelector(
  selectAuth,
  (auth) => auth.error
);

export const getIsAuthInProgress = createSelector(
  selectAuth,
  (auth) => auth.isLoading
);

export const getUser = createSelector(
  selectAuth,
  (auth) => auth.user
);

export const isAuthenticated = createSelector(
  selectAuth,
  (auth) => !!auth.user
);
