import { Component, OnInit } from '@angular/core';
import { LoginPresenter } from './login.presenter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
  providers: [LoginPresenter],
})
export class LoginComponent implements OnInit {
  constructor(public presenter: LoginPresenter, private router: Router) {
    this.presenter.setView(this);
  }

  ngOnInit(): void {}

  login() {
    this.presenter.auth();
  }

  onErrorAuth(response) {
    // Show modal
  }

  onSuccessAuth(response) {
    this.router.navigate(['home']);
  }
}
