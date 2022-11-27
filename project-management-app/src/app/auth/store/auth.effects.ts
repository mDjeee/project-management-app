import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from "@angular/router";

import * as AuthActions from './auth.actions';
import url from "src/app/constants/baseUrl";
import { AuthResponse } from "../models/AuthResponse";
import { User } from "../models/user.model";
import { LoginResponse } from "../models/loginResponse";
import { MatSnackBar } from "@angular/material/snack-bar";
import { getCookie, removeCookie, setCookie } from "src/app/core/services/cookie.service";

let signinAfterSignupPassword = '';
let signinAfterSignupLogin = '';

export function parseJwt(token: string) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

const handleAuthentication = (name: string, login: string, id: string) => {
  const user = new User(id, name, login);
  setCookie('user', JSON.stringify(user));
  return new AuthActions.SignupSuccess({
    name: name,
    login: login,
    id: id,
  })
}

const handleLogin = (token: string, redirect: boolean) => {
  const {userId, login, iat} = parseJwt(token);

  setCookie('token', token);
  setCookie('login', login);
  setCookie('user_signed_in', `${new Date(iat * 1000)}`);
  setCookie('userId', userId);

  return new AuthActions.LoginSuccess({token: token, redirect: redirect});
}

const handleError = (errorRes: any) => {
  signinAfterSignupLogin = '';
  signinAfterSignupPassword = '';
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticationFail(errorRes.error.message));
  }
  return of(new AuthActions.AuthenticationFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  @Effect()
  authSignup$ = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignupStart) => {
      return this.http.post<AuthResponse>(url + '/signup', {
        name: signupAction.payload.name,
        login: signupAction.payload.login,
        password: signupAction.payload.password,
      })
      .pipe(
        map(resData => {
          signinAfterSignupLogin = signupAction.payload.login;
          signinAfterSignupPassword = signupAction.payload.password;
          return handleAuthentication(
            resData.name,
            resData.login,
            resData.id
          );
        }),
        catchError(errorRes => {
          return handleError(errorRes);
        })
      );
    })
  )

  @Effect()
  authLogin$ = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START, AuthActions.SIGNUP_SUCCESS),
    switchMap((authData: AuthActions.LoginStart) => {
      const login = signinAfterSignupLogin ? signinAfterSignupLogin : authData.payload.login;
      const password = signinAfterSignupPassword ? signinAfterSignupPassword : authData.payload.password;
      return this.http.post<LoginResponse>(url + '/signin', {
        login: login,
        password: password
        }
      )
      .pipe(
        map(resData => {
          signinAfterSignupLogin = '';
          signinAfterSignupPassword = '';
          return handleLogin(resData.token, true);
        }),
        catchError(errorRes => {
          return handleError(errorRes);
        })
      )
    })
  )

  @Effect()
  autoLogin$ = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const token = getCookie('token');
      if(!token) {
        return { type: 'DUMMY' };
      } else {
        return handleLogin(token, false);
      }
    })
  )

  @Effect({ dispatch: false })
  authRedirect$ = this.actions$.pipe(
    ofType(AuthActions.LOGIN_SUCCESS),
    tap((authSuccessAction: AuthActions.LoginSuccess) => {
      this._snackBar.open('Successfully authenticated', 'OK',{
        duration: 3000,
        panelClass: ['blue-snackbar']
      });
      if(authSuccessAction.payload.redirect) {
        this.router.navigate(['/']);
      }
    }),
    tap(() => {

    })
  )

  @Effect({ dispatch: false })
  authLogout$ = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      signinAfterSignupLogin = '';
      signinAfterSignupPassword = '';

      removeCookie('token');
      removeCookie('login');
      removeCookie('user_signed_in');
      removeCookie('userId');

      this.router.navigate(['/login']);
    })
  )
}
