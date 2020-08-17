import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  public onChangeLoginAction(action: LoginActions): void {
    this.currentLoginAction = action;
  }
}
