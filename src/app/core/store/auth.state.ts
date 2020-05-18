import { State, Selector, StateContext } from '@ngxs/store';
import { Receiver, EmitterAction } from '@ngxs-labs/emitter';
import { AuthStateModel } from './auth-state.model';
import { Injectable } from '@angular/core';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    username: '',
    token: '',
  },
})
@Injectable()
export class AuthState {
  constructor() {}

  @Selector()
  static token(state: AuthStateModel): string {
    return state.token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  @Receiver()
  public static setToken(
    { patchState }: StateContext<AuthStateModel>,
    { payload }: EmitterAction<string>
  ) {
    patchState({ token: payload });
  }
}
