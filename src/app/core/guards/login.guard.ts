import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '../store/auth.state';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate() {
    console.log('entro');
    const isAuthenticated = this.store.selectSnapshot(
      AuthState.isAuthenticated
    );
    if (isAuthenticated) {
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}
