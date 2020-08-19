import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs';

import { User } from 'models/interfaces/user.interface';
import { AuthService } from '../services/auth.service';

enum LoginActions {
  SIGNIN,
  SIGNUP
}

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss']
})
export class SigninFormComponent implements OnInit {
  public loginActions: typeof LoginActions = LoginActions;
  public currentLoginAction: LoginActions = LoginActions.SIGNIN;
  public user$: Observable<User>;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user$ = this.authService.user$;
  }

  public onChangeLoginAction(action: LoginActions): void {
    this.currentLoginAction = action;
  }

  onSignin(form: NgForm): void {
    const email: string = form.value.email.trim();
    const password: string = form.value.password.trim();

    this.authService.signin(email, password);

    form.reset();
  }

  onSignup(form: NgForm): void {
    const email: string = form.value.email.trim();
    const password: string = form.value.password.trim();
    const displayName = `${form.value.firstName.trim()} ${form.value.lastName.trim()}`;

    this.authService.signup(email, password, displayName);
  }

  public authorizeWithGoogle(): void {
    this.authService.authorizeWithGoogle();
  }
}
