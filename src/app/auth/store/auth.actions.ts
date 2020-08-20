import { createAction, props } from '@ngrx/store';

import { User } from 'models/interfaces/user.interface';
import { SocialAuthProvidersEnum } from 'models/enums/social-auth-providers.enum';

export const signinStart = createAction(
  '[Auth] Signin Start',
  props<{ email: string, password: string }>()
);

export const signupStart = createAction(
  '[Auth] Signup Start',
  props<{ email: string, password: string, displayName: string }>()
);

export const socialAuthStart = createAction(
  '[Auth] Social Auth Start',
  props<{ provider: SocialAuthProvidersEnum }>()
);

export const authSuccess = createAction(
  '[Auth] Auth Success',
  props<{ user: User }>()
);

export const authFail = createAction(
  '[Auth] Auth Fail',
  props<{ error: string }>()
);

export const clearAuthError = createAction('[Auth] Clear Auth Error');

export const logout = createAction('[Auth] Logout');
