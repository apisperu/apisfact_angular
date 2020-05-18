import { Injectable } from '@angular/core';

import { LoginComponent } from './login.component';
import { LoginService } from 'src/app/core/services/login.service';
import { AuthState } from 'src/app/core/store/auth.state';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
import { ILoginRequest } from 'src/app/core/models/login.request';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoginPresenter {
  @Emitter(AuthState.setToken)
  private setToken: Emittable<ILoginRequest>;
  loginForm: FormGroup;

  private view: LoginComponent;

  constructor(private loginService: LoginService, private fb: FormBuilder) {
    this.setForm();
  }

  setView(view: LoginComponent) {
    this.view = view;
  }

  setForm() {
    this.loginForm = this.fb.group({
      username: [],
      password: [],
    });
  }

  auth() {
    const request: ILoginRequest = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value,
    };

    this.loginService.auth(request).subscribe(
      (response) => {
        this.setToken.emit(response.token);
        this.view.onSuccessAuth(response);
      },
      (err) => {
        this.view.onErrorAuth(err);
      }
    );
  }
}
