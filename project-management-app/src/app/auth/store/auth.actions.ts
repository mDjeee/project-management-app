import { Action } from '@ngrx/store';

export const SIGNUP_START = '[Auth] Signup Start';
export const SIGNUP_SUCCESS = '[Auth] Signup Success';
export const AUTHENTICATE_FAIL = '[Auth] Login Fail';
export const LOGIN_START = '[Auth] Login Start';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const LOGOUT = '[Auth] Logout';
export const CLEAR_ERROR = '[Auth] Clear Error';


export class SignupStart implements Action {
  readonly type = SIGNUP_START;

  constructor(public payload: { name: string, login: string; password: string }) {}
}

export class SignupSuccess implements Action {
  readonly type = SIGNUP_SUCCESS;

  constructor(public payload: {
    name: string,
    login: string,
    id: string
  }) { }
}

export class AuthenticationFail implements Action {
  readonly type = AUTHENTICATE_FAIL;

  constructor(public payload: string) { }
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: {login: string, password: string}) { }
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: {
    token: string,
    redirect: boolean
  }) { }
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export type AuthActions =
  | SignupStart
  | SignupSuccess
  | AuthenticationFail
  | LoginStart
  | LoginSuccess
  | Logout
  | AutoLogin
  | ClearError;
